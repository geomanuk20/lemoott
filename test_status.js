const { StandardCheckoutClient, Env } = require('./server/node_modules/@phonepe-pg/pg-sdk-node');
require('dotenv').config({ path: './server/.env' });

const testStatus = async () => {
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = parseInt(process.env.PHONEPE_SALT_INDEX || '1');
  
  console.log(`Testing with ${merchantId}`);
  const client = StandardCheckoutClient.getInstance(merchantId, saltKey, saltIndex, Env.SANDBOX);
  
  try {
    const res = await client.getOrderStatus("TXN_1779365455510BZJDK");
    console.log("Status Response:", res);
  } catch(e) {
    console.log("Error:", e.message || e);
  }
}
testStatus();
