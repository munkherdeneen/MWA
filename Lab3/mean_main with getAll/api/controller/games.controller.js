const gameData = require("../data/games.json");

getAll = function(req, res) {
    console.log("Controller GetAll envoked");
    res.status(200).json(gameData);
}

module.exports = {
    getAll
}