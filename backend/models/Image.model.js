const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    name: {type: String, required: true},
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
    authorName: {type: String, required: true},

    img: { data: Buffer, contentType: String },

    visibility: {type:Number} // 1 = public, 0 = private
    

},{timestamps: true});

const Image = mongoose.model('Image', ImageSchema);


module.exports = Image;