const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    creationDate: { type: mongoose.SchemaTypes.Date, required:true, default: Date.now },
    image: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Image'}]
})

module.exports = mongoose.model('Tag', tagSchema)