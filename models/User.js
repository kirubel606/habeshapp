const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    //IN HERE COMPARE THE HASHED PASSWORD WITH THE CURRENT ONE
    if(user.password == password)
      return user;
    }
    throw Error('incorrect password or email');
  //throw Error('incorrect email');
};


const User = mongoose.model('habeshacoll', userSchema);

module.exports = User;