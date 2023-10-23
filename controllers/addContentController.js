// const Content = require('../models/Contents')

// module.exports = async (req, res) => {
//     try {
//         await Content.create(req.body);
//         console.log("Content Added Successfully!");
//         res.redirect('/admin/add');
//         console.log(req.body);
//     } catch (error) {
//         // Handle errors here
//         // if (error) {
//         //     const valiadataionErrors = Object.keys(error.errors).map(key => error.errors[key].message)
//         //     req.flash('validationErrors', valiadataionErrors)
//         //     req.flash('data', req.body)
//         //     return res.redirect('/admin/add')
//         // }
//         console.error(error);
//         return res.redirect('/admin/add');
//     }
// }


// const Content = require('../models/Contents')

// module.exports = async(req, res) => {

//     try {
//         let newContent = new Content({
//             title: req.body.title,
//             category: req.body.category,
//             description: req.body.description
//         })
//         await newContent.save()
//         res.redirect('/admin')
//         // console.log(req.body)
//     } catch (error) {
//         console.error(error)
//         res.redirect('/admin')
//     }
// }

// const multer = require('multer');
// const Content = require('../models/Contents');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).fields([
//   { name: 'photo', maxCount: 1 },
//   { name: 'zipfile', maxCount: 1 },
// ]);

// module.exports = async (req, res) => {
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.redirect('/admin/add');
//       }

//       const { title, category, description } = req.body;
//       const photoPath = req.files['photo'][0].path;
//       const zipFilePath = req.files['zipfile'][0].path;

//       const content = new Content({
//         title,
//         category,
//         description,
//         photoPath,
//         zipFilePath,
//       });

//       await content.save();
//       console.log('Content Added Successfully!');
//       res.redirect('/admin/add');
//       console.log(req.body);
//     });
//   } catch (error) {
//     console.error(error);
//     return res.redirect('/admin/add');
//   }
// };


const multer = require('multer');
const Content = require('../models/Contents');
const Counter = require('../models/Counter'); // Import the Counter model

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'zipfile', maxCount: 1 },
]);

module.exports = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/admin/add');
      }

      // Fetch the next available id_content from the Counter model
      const counter = await Counter.findOneAndUpdate(
        { model: 'Content', field: 'id_content' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );

      const { title, category, description } = req.body;
      const photoPath = req.files['photo'][0].path;
      const zipFilePath = req.files['zipfile'][0].path;

      // Remove the 'public/uploads/' prefix from the paths
      const sanitizedPhotoPath = photoPath.replace('public/', '');
      const sanitizedZipFilePath = zipFilePath.replace('public/', '');


      const content = new Content({
        id_content: counter.count,
        title,
        category,
        description,
        photoPath: sanitizedPhotoPath,
        zipFilePath: sanitizedZipFilePath,
      });

      await content.save();
      console.log(content);
      res.redirect('/admin/add');
      console.log(req.body);
    });
  } catch (error) {
    console.error(error);
    return res.redirect('/admin/add');
  }
};



