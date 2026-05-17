const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/video_ott');
const Movie = mongoose.model('Movie', new mongoose.Schema({ title: String }, { strict: false }));
async function check() {
  const movies = await Movie.find().sort({createdAt: -1});
  console.log(movies);
  process.exit();
}
check();
