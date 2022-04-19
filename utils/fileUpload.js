const multer = require('multer');
const fs = require('fs');
"use strict";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file.fieldname)
        console.log(file.originalname+"is the name")
        console.log("reqesuest object")
        const {name} = req.body;
        const folder = `uploaded/${name}`;
        // try {
        //   if (!fs.existsSync(folder)) {
        //     fs.mkdir(folder,(err,path)=>{
        //       if(err){console.log("there is an error")}
        //       console.log("the path"+path)
        //     });
            cb(null, folder)
        //   } else {
        //     console.log('already uploaded')
        //   }
        // } catch (err) {
        //   console.log(err)
        // }
        
      
    },
    filename: function (req, file, cb) {
//      console.log(JSON.stringify(req.files['apk'])+"is the files")
      
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname+ '-' + uniqueSuffix + ext)
    }
})

  // const storageforIcon = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //       if((fs.existsSync('uploads/Icon/'))) {
  //           cb(null, 'uploads/Icon')
  //       }else{console.log("app already ex")}
      
  //   },
  //   filename: function (req, file, cb) {
  //     let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //     cb(null, file.originalname+ '-' + uniqueSuffix + ext)
  //   }
  // })




  const upload = multer({ storage: storage })
  // const uploadIcon = multer({ storage: storageforIcon })uploadIcon

  module.exports =upload;