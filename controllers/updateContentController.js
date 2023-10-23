const Content = require('../models/Contents');
const Reason = require('../models/Reason');

const mongoose = require('mongoose');

const updateContentController = async (req, res) => {
    try {
        const { content_id, title, category, description } = req.body
        let contentUpdate = await Content.updateOne({ id_content: content_id }, {
            title: title,
            category: category,
            description: description
        })
        console.log(contentUpdate)
    } catch (error) {
        console.error(error)
    }
}

module.exports = updateContentController
