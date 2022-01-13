module.exports.multiplier = function(req, res) {
    console.log("Multiplier invoked");
    let number1 = parseInt(req.params.number1, 10);
    let number2 = 0;

    if(req.query && req.query.number2) {
        number2 = req.query.number2;
    }

    res.status(200).json(number1*number2);
}