const Content = require('../models/Contents');
const Reason = require('../models/Reason');

const mongoose = require('mongoose');

const deleteContentController = async (req, res) => {
    try {
        const { content_id, reason } = req.body
        let contentDelete = await Content.deleteOne({ id_content: content_id })

        let reasonAdd = new Reason({
            content_id: content_id,
            reason: reason
        })

        await reasonAdd.save()

        console.log(reasonAdd)
        console.log(contentDelete)
        res.redirect('/admin/delete')
    } catch (error) {
        console.error(error)
    }
}

module.exports = deleteContentController
