// const formidable = require('formidable')
const formidable = require('formidable')
const { db } = require('../../db')

const controller = {}

const base64_decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

controller.createUser = (req, res, next) => {
  // console.log('came here')

  // console.log(req.body.bytesString)

  // const storageRef = db.storage().ref();
  // const mountainsRef = storageRef.child('mountains.jpg');
  // mountainsRef.putString(req.body.bytesString, 'base64').then(function(snapshot) {
  //   console.log('Uploaded a base64 string!');
  //   return res.json({success: true, data: 'file uploaded'})
  // })
  // .catch(e => {
  //   console.log('error')
  //   console.log(e)
  //   return res.json({success: false, error: e})
  // });
// ***************************
db.collection("users")
.add({
  ...req.body
})
.then(ref => res.json({ success: true, data: ref.id }))
.catch(e => res.json({ success: false, error: e }));


  // console.log(req.body.file)
  // let storage = db.storage().ref();
  // let form = new formidable.IncomingForm();
//   console.log("hi there")
//   console.log(req.file)
//
  //  var form = new formidable.IncomingForm()
  //  form.on('file', (field, file) => {
  //    console.log('came here to upload files')
  // // Do something with the file
  // // e.g. save it to the database
  // // you can access it using file.path
  // res.json({success: true, path: file.path})
// })
// form.on('end', () => {
//   console.log('came here to end the request')
//   res.json({success: true, data: 'came to create user'})
// })
// form.on('error', (e) => {
//   console.log('error occured ' + JSON.stringify(e))
//   res.json({success: false})
// })
// form.parse(req)

}

controller.getUsers = (req, res, next) => {
  res.json({success: true, data: 'user get is working'})
}
module.exports = {
  controller
}
