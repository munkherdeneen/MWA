const dbconnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

getAll = function(req, res) {
    console.log("Controller GetAll envoked");
    let offset = 0;
    let count = 6;

    console.log(req.query);
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    console.log("offset:", offset, " count:", count, " offset + count: ", offset + count);

    if(count > 9) {
        console.log("Limit games count is exceeded");
        res.status(404).json("Limit games count is exceeded");
    }
    else {
        const db = dbconnection.get();
        const gamesCollection = db.collection(process.env.DB_COLLECTION);

        gamesCollection.find().skip(offset).limit(count).toArray(function(err, games) {
            console.log("Found games", games);
            res.status(200).json(games);
        });
    }
}

getOne = function(req, res) {
    const gameId = req.params.gameId;

    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.DB_COLLECTION);

    gamesCollection.findOne({_id: ObjectId(gameId)}, function(err, game) {
        console.log("Found game", game);
        res.status(200).json(game);
    })
}

addOne = function(req, res) {
    console.log("Controller addOne invoked");
    console.log(req.body);

    if(req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        console.log("The body is: ", req.body);

        let minPlayers = parseInt(req.body.minPlayers);
        let minAge = parseInt(req.body.minAge);

        if(1 <= minPlayers && minPlayers <= 11) {
            if(1 <= minAge && minAge <= 99) {
                const db = dbconnection.get();
                const gamesCollection = db.collection(process.env.DB_COLLECTION);
                
                let newGame = {
                    title: req.body.title,
                    price: parseInt(req.body.price),
                    minAge: minAge,
                    minPlayers: minPlayers
                };

                gamesCollection.insertOne(newGame, function(err, insertedGame) {
                    console.log("InsertOne invoked", insertedGame);
                    res.status(200).json(insertedGame);
                });
            }
            else {
                console.log("Minimum age is exceeded.");
                res.status(400).json("Minimum age is exceeded.");
            }
        } 
        else {
            console.log("Minimum player count is exceeded.");
            res.status(400).json("Minimum player count is exceeded."); 
        }
    }
    else {
        console.log("Data missing from POST body");
        res.status(400).json("Data missing from POST body");
    }
}

deleteOne = function(req, res) {
    const gameId = req.params.gameId;

    const db = dbconnection.get();
    const gamesCollection = db.collection(process.env.DB_COLLECTION);

    gamesCollection.findOne({_id: ObjectId(gameId)}, function(err, game) {
        if(game == null) {
            console.log("Could not find the game");
            res.status(400).json("Could not find the game");
        }
        else {
            gamesCollection.deleteOne({_id: ObjectId(gameId)}, function(err, deletedGame) {
                console.log("The game deleted", deletedGame);
                res.status(200).json(deletedGame);
            })
        }
    })
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
}