const express= require("express")
const routes= express.Router()

const imageController= require("../Modelos/imageModel");
const connection = require("../database/db");

routes.get("/uploadNews", (req, res) => {
    // Renderiza el formulario EJS y envíalo al cliente
    res.render("uploadFile"); // Puedes pasar cualquier otro dato necesario aquí
});


routes.post("/images", imageController.upload, imageController.uploadFile)


routes.get("/newsHistorial", (req, res) => {
    const user_id = req.session.user;
    connection.query("SELECT id, title, content, created_at, user_id FROM news WHERE user_id = ?", [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching news:", err);
            res.status(500).send("Error fetching news");
            return;
        }

        const news = results; // Asignar todos los resultados a news
        res.render("newsHistorial", { news });
    });
});


routes.get("/edit/:id", (req,res)=>{
    const id= req.params.id
    connection.query("SELECT * FROM news WHERE id=?", [id], (err, results)=>{
        if(err) throw err
        const noticia= results[0]
        res.render("editNews", {noticia})
    })
})


routes.post("/actualiza", (req,res)=>{
    const id= req.body.id
    const title = req.body.title
    const content= req.body.content
    connection.query("UPDATE news SET title=?, content=? WHERE id=?", [title, content, id], (err, results)=>{
        if(err) throw err
        res.redirect("/newsHistorial")
    })
})

routes.get("/delete/:id", (req,res)=>{
    const id= req.params.id
    connection.query("DELETE FROM news WHERE id=?", [id], (err, results)=>{
        if(err) throw err
        res.redirect("/newsHistorial")
    })
})


module.exports= routes