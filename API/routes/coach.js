const { AddCoach, DeletePlayer, UpdatePlayer, getCoach, getAllCoaches,UpdateCredentials,
    GetUserDetails, } = require("../controllers/coaches")

const router = require("express").Router()

router.post("/add", AddCoach)
router.delete("/delete", DeletePlayer)
router.put("/update", UpdatePlayer)
router.put("/update2", UpdateCredentials)

router.get("/getAllCoaches", getAllCoaches)
router.get("/getCoach", getCoach)
router.get("/getCoach2", GetUserDetails)


module.exports = router