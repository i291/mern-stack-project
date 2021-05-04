const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3
  },
  passHash: String,
  exercises:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Exercise'
    }
  ]
},

{
  timestamps: true,
});
userSchema.plugin(uniqueValidator)


const User = mongoose.model('User', userSchema);

module.exports = User;