const Router= require("express");
const routes= Router.Router();
const connection= require("../database/db");

routes.get("/", (req,res)=>{
        connection.query("CALL SP_SELECTNEWS();", (err, results)=>{
            console.log(results)
            const noticias= results[0]
            res.render("index", {noticias})
        })
})

module.exports= routes;