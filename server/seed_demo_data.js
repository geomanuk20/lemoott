const mongoose = require('mongoose');
require('dotenv').config();

const Movie = require('./models/Movie');
const Show = require('./models/Show');
const Season = require('./models/Season');
const Episode = require('./models/Episode');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Sample Movies
    const movies = [
      {
        title: 'Fast X',
        language: 'English',
        genres: ['Action', 'Thriller'],
        poster: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
        status: 'Active'
      },
      {
        title: 'Kantara',
        language: 'Malayalam',
        genres: ['Action', 'Drama'],
        poster: 'https://m.media-amazon.com/images/M/MV5BOGNlODNhYTMtNmFkOC00ZWEyLWEwNDktY2M4YjE3ZGIzMTA5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BOGNlODNhYTMtNmFkOC00ZWEyLWEwNDktY2M4YjE3ZGIzMTA5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
        status: 'Active'
      }
    ];

    await Movie.insertMany(movies);
    console.log('Sample movies seeded!');

    // Sample TV Show
    const show = await Show.create({
      title: 'Breaking Bad',
      language: 'English',
      genres: ['Crime', 'Drama'],
      poster: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTUtMWMyOWQ0M2M1OTQxXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTUtMWMyOWQ0M2M1OTQxXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg'
    });

    const season = await Season.create({
      showId: show._id,
      showName: 'Breaking Bad',
      title: 'Season 1',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTUtMWMyOWQ0M2M1OTQxXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg'
    });

    await Episode.create({
      seasonId: season._id,
      showSeason: 'Breaking Bad - Season 1',
      title: 'Pilot',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTUtMWMyOWQ0M2M1OTQxXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg'
    });

    console.log('Sample TV Show data seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
