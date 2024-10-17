const { AddPlayer, getAllPlayers, DeletePlayer, UpdatePlayers, UpdatePlayer } = require('../controllers/juniors');
const router = require("express").Router();

// Define the routes and map them to their respective controller functions
router.post("/add", AddPlayer);             // Route to add a player
router.get("/getPlayers", getAllPlayers);   // Route to get all players
router.delete("/delete", DeletePlayer);     // Route to delete a player
        // Route to update a player's information
router.put("/update", UpdatePlayer)

module.exports = router;
