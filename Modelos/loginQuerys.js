const Router= require("express");
const routes= Router.Router();
const bcryptjs= require("bcryptjs");
const connection= require("../database/db");



// REGISTRO
routes.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const rol = req.body.rol;
    let passwordEncrypt = await bcryptjs.hash(pass, 8);

    connection.query('CALL SP_LOGINUSUARIOS (?, ?, ?, ?)', [name, email, passwordEncrypt, rol], async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT @idValue AS id', (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    const userId = rows[0].id;
                    req.session.loggedin = true;
                    req.session.name = name;
                    req.session.user = userId;
                    console.log(rows)
                    res.render("register", {
                        alert: true,
                        alertTitle: "Registro",
                        alertMessage: "REGISTRO EXITOSO",
                        alertIcon: "success",
                        showConfirmButton: true,
                        time: 1500,
                        ruta: "home"
                    });
                }
            });
        }
    });
});



// AUTENTICACION O LOGIN
routes.post("/auth", async(req, res)=>{
    const user= req.body.user;
    const pass= req.body.pass;
    let passwordEncrypt= await bcryptjs.hash(pass, 8);
    if(user && pass){
        connection.query("SELECT * FROM users WHERE id=?",[user], async(error, results)=>{
            // DATO SUPER IMPORTANTE EN EL .PWD ES EL NOMBRE DE LA COLUMNA EN LA BD
            if(results.length==0 || !(await bcryptjs.compare(pass, results[0].pwd))){
                res.render("login",{
                  alert: true,
                  alertTitle: "Error",
                  alertMessage: "ID Y/O CONTRASEÑA INCORRECTOS",
                  alertIcon: "error",
                  showConfirmButton: true,
                  time: false,
                  ruta: "login"
                });
            }else{
                // AQUI EL NAME REPRESENTA LA BASE DE DATOS
                req.session.loggedin=true
                req.session.name= results[0].name
                req.session.user = results[0].id;
                console.log(results)
                res.render("login",{
                  alert: true,
                  alertTitle: "INICIANDO SESION",
                  alertMessage: "CREDENCIALES CORRECTAS",
                  alertIcon: "success",
                  showConfirmButton: true,
                  time:1500,
                ruta: "home"
                });
            }
        })
    }else{
        // SE PODRIA METER UN RENDER IGUAL QUE ARRIBA PERO SERIA NECESARIO QUITAR EL REQUIRED EN EL EJS
        res.send("Favor de ingresar un usuario y/o Contraseña")
    }

})

routes.get("/",(req,res)=>{
        // ESTE INDEX SE DEJA IGUAL YA QUE MANDARA A LA PAGINA INICIAL EN CASO DE QUE NO HAYA SECION
        res.render("index",{
            name: "Debe Iniciar Sesion"
        })
})

routes.get("/home", (req,res)=>{
    const user= req.body.user
    res.render("home",{
        name: req.session.name,
        user: req.session.user,
        
    })
})



routes.post("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    });
})


module.exports=routes;