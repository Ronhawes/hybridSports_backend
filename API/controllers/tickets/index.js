const { generateToken, stkPush } = require("./stk")
const AddPlayer=require("./add")
const DeletePlayer = require("./delete")
const UpdatePlayer = require("./update")

const getPlayer = require('./getPlayer');
const getAllPlayers=require('./getPlayers')



module.exports = {
    generateToken,
    stkPush,
    UpdatePlayer,
    AddPlayer,
    DeletePlayer,
    getAllPlayers,
    getPlayer
}

