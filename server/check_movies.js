const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://geomanuk20_db_user:6w2GRqYm7DMfOXiB@video.lukedio.mongodb.net/');
const Movie = mongoose.model('Movie', new mongoose.Schema({ title: String }, { strict: false }));
async function check() {
  const m = await Movie.findOne({ title: 'Fast X' });
  console.log(JSON.stringify(m, null, 2));
  process.exit();
}
check();
