const{AddPlayer}= require('../controllers/juniors')

const router = require("express").Router()

router.post("/add", AddPlayer)

module.exports=router