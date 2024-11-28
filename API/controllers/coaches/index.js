const AddCoach = require("./add")
const DeletePlayer = require("./delete")
const UpdatePlayer = require("./update")
const UpdateCredentials = require("./updateCoach")
const GetUserDetails = require("./getCoach")


const getCoach = require('./getPlayer');
const getAllCoaches=require('./getPlayers')



module.exports = {
    AddCoach,
    UpdatePlayer,
    UpdateCredentials,
    GetUserDetails,
    
    DeletePlayer,
    getAllCoaches,
    getCoach
}

