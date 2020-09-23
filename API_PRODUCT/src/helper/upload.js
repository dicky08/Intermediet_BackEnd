const multer = require('multer');
const {failed} = require('../helper/respons')
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/img')
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}.png`);
    }
});

const upload = multer({
    storage,
    // Max 2 mb
    limits:{fileSize:2000000},
    fileFilter(req,file,callback) {
        if (file.originalname.match(/\.(JPG|jpg|JPEG|jpeg|png|PNG|SVG|svg)\b/)) {
            callback(null,true)
        }else{
            callback('File must be of type jpeg,jpg or png', null)
        }
    }
});

module.exports = upload;