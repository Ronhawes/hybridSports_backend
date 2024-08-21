const AddPlayer = require("./add")
const DeletePlayer = require("./delete")
const UpdatePlayer = require("./update")

const getPlayer = require('./getPlayer');
const getAllPlayers=require('./getPlayers')



module.exports = {
    AddPlayer,
    UpdatePlayer,
    
    DeletePlayer,
    getAllPlayers,
    getPlayer
}

