import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb)=> {
        cb (null, file.filename + "-" + new Date.now())
    }
})

export const upload = multer({storage})