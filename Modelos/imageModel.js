const multer= require("multer");
const Router= require("express");
const path= require("path")
const connection= require("../database/db");

const storage= multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req,file, cb )=>{
        cb(null, `${Date.now()}-${file.originalname}`); //EN CASO DE QUE LOS ARCHIVOS SE LLAMEN IGUAL QUE NO SE SOBREE ESCRIBAN
    }
})

const upload= multer({storage: storage})

exports.upload = upload.single("image")

exports.uploadFile = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const image_url = req.file.filename;
    const created_at = new Date();
    const user_id = req.session.user;

    connection.query("CALL SP_INSERTIMAGE (?, ?, ?, ?, ?)", [title, content, image_url, created_at, user_id], (err, rows) => {
        if (err) {
            console.error("Error al insertar la imagen:", err);
            res.json({ err: "Error al cargar la imagen" });
        } else {
            console.log("Imagen agregada correctamente.");
            // Redirecciona al usuario a la ruta '/home'
            res.redirect("/home?msg=success");
        }
    });
};
