let express = require("express");
let mongoose = require("mongoose");
let promise = mongoose.connect('mongodb://localhost/pcs');
let size = require('./models/size')(mongoose);
let app = express();
let port = 8080;

app.use(express.static('../ParcelConfigService/'));

app.route('/api/getGirthSize').get(function (req, res) {
    let self = JSON.parse(req.query.size);
    if (self) {
        let input = self["length"] + 2 * self["width"] + 2 * self["height"];
        size["findOne"]({from: {$lte: input}, to: {$gte: input}}, function (err, size) {
            if (err) res.status(503).send(err);
            else if (!size) res.json({size: "---"});
            else res.json({size: size.title});
        });
    } else res.status(428).send("Es wurde keine Größe übergeben.");
});

app.route("/*").get(function (req, res) {
    res.redirect('/');
});

function createSize(params) {
    let newSize = new size(params);
    newSize.save();
}

size.count({}, function (err, counter) {
    if (counter < 1) {
        createSize({from: 0, to: 35, title: "XS"});
        createSize({from: 35, to: 50, title: "S"});
        createSize({from: 50, to: 65, title: "M"});
        createSize({from: 65, to: 80, title: "L"});
        createSize({from: 80, to: 300, title: "XL"});
    }
});

app.listen(port, function () {
    console.info(promise);
    console.info("http://localhost:" + port);
});

process.on("SIGINT", function () {
    process.kill(process.pid, "SIGTERM");
    mongoose.connection.close();
});