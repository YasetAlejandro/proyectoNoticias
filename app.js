// CONFIGURAMOS Y TRAEMOS EXPRESS
const express= require("express");
const app= express();

// CAPTURA DE DATOS DEL FORMULARIO POR URLENCONDES
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

// INVOCAMOS A DOTENV
const dotenv= require("dotenv");
dotenv.config({path: './env/.env'})

// EL DIRECTORIO PUBLIC 
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname+ "/public"))


// ESTABLECEMOS EL MOTOR DE PLANTILLA EJS
app.set("view engine", "ejs");

// CONSULTAMOS A BYCRYPTJS ESTO ESTARA EN EL MODELO
const bcryptjs= require("bcryptjs");
//
const session= require("express-session");
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// MODULO DE CONEXION
const connection= require("./database/db");

// LOS REQUIRES DE LOS MODELOS
app.use(require("./Modelos/loginQuerys"));
app.use(require("./controllers/imageRoutes"))
app.use(require("./Modelos/indexNewsModel"))
app.use("/images", express.static("images"))


// ESTABLECIENDO RUTAS

app.get('/login', (req, res)=>{
    res.render("login")
})

app.get('/register', (req, res)=>{
    res.render("register")
})


// PUERTO
app.listen(3000, (req, res)=>{
    console.log("SERVIDOR ESCUCHANDO EL PUERTO 3000")
})

