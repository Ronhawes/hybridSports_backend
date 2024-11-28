const { generateToken, stkPush,handleCallback , DeletePlayer, UpdatePlayer, getAllPlayers,getPlayer,AddPlayer } = require("../controllers/tickets")

const router = require("express").Router()

router.post("/stk", generateToken, stkPush,handleCallback );
router.post("/add", AddPlayer);
router.post("/callback", handleCallback);


router.delete("/delete", DeletePlayer)
router.put("/update", UpdatePlayer)

router.get("/getPlayers", getAllPlayers)
router.get("/getPlayer", getPlayer)


module.exports = router