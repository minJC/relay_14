const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = mongoose.Schema({
   userFrom: {
       type: Schema.Types.ObjectId,
       ref: 'userFrom'
   },
   userTo: {
       type: Schema.Types.ObjectId,
       ref: 'userTo'
   }

}, { timestamps: true })


const Follow = mongoose.model('Follow', followSchema);

module.exports = { Follow }
