const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContentSchema = new Schema({
    id_content: {
        type: Number,
        // required: [true, 'ID is required']
    },
    title: {
        type: String,
        // required: [true, 'Title is required']
    },
    category: {
        type: String,
        // required: [true, 'Category is required']
    },
    description: {
        type: String,
        // required: [true, 'Description is required']
    },
    photoPath: {
        type: String,
        // required: [true, 'Photo is required']
    },
    zipFilePath: {
        type: String,
        // required: [true, 'Zip File is required']
    }
})



const Content = mongoose.model('contents', ContentSchema)
module.exports = Content

