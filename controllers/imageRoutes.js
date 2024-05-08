const express= require("express")
const routes= express.Router()

const imageController= require("../Modelos/imageModel")

routes.post("/images", imageController.upload, imageController.uploadFile)

module.exports= routes