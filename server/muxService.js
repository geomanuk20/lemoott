const axios = require('axios');
const jwt = require('jsonwebtoken');

// In-memory cache for playback ID policies (e.g., 'public' vs 'signed')
const policyCache = new Map();

/**
 * Ingests a video file URL into Mux and returns the playback URL.
 * @param {string} videoUrl - The public URL of the uploaded video (e.g. from Cloudinary)
 * @returns {Promise<string|null>} - The Mux playback URL (.m3u8) or null if bypassed
 */
const uploadToMux = async (videoUrl) => {
  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;

  if (!tokenId || !tokenSecret) {
    console.log('Mux credentials not configured. Skipping Mux ingestion.');
    return null;
  }

  try {
    const policy = process.env.MUX_PLAYBACK_POLICY || 'public';
    const authHeader = Buffer.from(`${tokenId}:${tokenSecret}`).toString('base64');
    const response = await axios.post(
      'https://api.mux.com/video/v1/assets',
      {
        input: videoUrl,
        playback_policy: [policy]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authHeader}`
        }
      }
    );

    const assetData = response.data?.data;
    if (assetData && assetData.playback_ids && assetData.playback_ids.length > 0) {
      const playbackId = assetData.playback_ids[0].id;
      // Pre-cache the policy of the newly ingested asset
      policyCache.set(playbackId, policy);
      return `https://stream.mux.com/${playbackId}.m3u8`;
    }
    return null;
  } catch (err) {
    console.error('Error creating Mux asset:', err.response ? err.response.data : err.message);
    throw new Error('Failed to ingest video into Mux');
  }
};

/**
 * Retrieves the playback policy for a given playback ID from Mux.
 * @param {string} playbackId
 * @returns {Promise<string>} - 'public' | 'signed' | etc.
 */
const getPlaybackPolicy = async (playbackId) => {
  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;

  if (!tokenId || !tokenSecret) {
    return 'public';
  }

  try {
    const authHeader = Buffer.from(`${tokenId}:${tokenSecret}`).toString('base64');
    const response = await axios.get(
      `https://api.mux.com/video/v1/playback-ids/${playbackId}`,
      {
        headers: {
          Authorization: `Basic ${authHeader}`
        }
      }
    );
    return response.data?.data?.policy || 'public';
  } catch (err) {
    console.error(`Error fetching policy for playback ID ${playbackId}:`, err.response ? err.response.data : err.message);
    return 'public'; // fallback to public if call fails
  }
};

/**
 * Cached getter for playback ID policies to reduce API roundtrips.
 * @param {string} playbackId
 * @returns {Promise<string>}
 */
const getPlaybackPolicyCached = async (playbackId) => {
  if (policyCache.has(playbackId)) {
    return policyCache.get(playbackId);
  }
  const policy = await getPlaybackPolicy(playbackId);
  policyCache.set(playbackId, policy);
  return policy;
};

/**
 * Signs a Mux playback ID using RS256 algorithm and the Mux Private Key.
 * @param {string} playbackId
 * @returns {string|null} - JWT signed token or null
 */
const signPlaybackId = (playbackId) => {
  const keyId = process.env.MUX_SIGNING_KEY_ID;
  const privateKeyRaw = process.env.MUX_PRIVATE_KEY;

  if (!keyId || !privateKeyRaw) {
    console.log('Mux signing keys not configured. Cannot sign token.');
    return null;
  }

  try {
    let privateKey = privateKeyRaw.trim();
    // If it doesn't start with -----BEGIN, try to decode from base64
    if (!privateKey.startsWith('-----BEGIN')) {
      privateKey = Buffer.from(privateKey, 'base64').toString('utf8');
    }
    privateKey = privateKey.replace(/:/g, '\n').replace(/\\n/g, '\n').replace(/"/g, '').trim();

    const payload = {
      sub: playbackId,
      aud: 'v'
    };

    const options = {
      algorithm: 'RS256',
      keyid: keyId,
      expiresIn: '24h' // 24-hour token expiration
    };

    return jwt.sign(payload, privateKey, options);
  } catch (err) {
    console.error(`Error generating signed JWT token for playback ID ${playbackId}:`, err.message);
    return null;
  }
};

module.exports = {
  uploadToMux,
  getPlaybackPolicyCached,
  signPlaybackId
};
