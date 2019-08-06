const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  login: {type: String, unique: true},
  password: String,
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = { User };