const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
let User = mongoose.model('user', userSchema);
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = hashPassword(user.password);

  return next();
});

userSchema.pre('findOneAndUpdate', function () {
  const password = hashPassword(this.getUpdate().$set.password);

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, {password: password});
});

userSchema.methods.validatePassword = function (requestPassword) {
  return bcrypt.compareSync(requestPassword, this.password);
};

function hashPassword (password) {
  if (!password) {
    return false;
  }

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = User;