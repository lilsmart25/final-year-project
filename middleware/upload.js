var multer = require('multer');
var path = require('path');
const {
    nextTick
} = require('process');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './public/upload/';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, 'SmartLeave' + '-' + Date.now() +'-' + file.originalname);
    }

});

var filefilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "application/pdf" || file.mimetype === "application/doc" || file.mimetype === "vidoe/mp4") {
        // To accept the file pass `true`, like so:
        cb(null, true);

    } else {
        // To reject this file pass `false`, like so:
        console.log('fail to upload file extention not supported')
        cb(null, false);
    }


}

upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5,
    filefilter: filefilter
});



module.exports = upload;