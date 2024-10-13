const { AddPlayer, DeletePlayer, UpdatePlayer, getAllPlayers,getPlayer } = require("../controllers/users")

const router = require("express").Router()

router.post("/add", AddPlayer)
router.delete("/delete", DeletePlayer)
router.put("/update", UpdatePlayer)

router.get("/getPlayers", getAllPlayers)
router.get("/getPlayer", getPlayer)


module.exports = router