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
            if (err) res.status(500).send(err);
            else if (!size) res.json({size: "---"});
            else res.json({size: size.title});
        });
    } else res.end();
});

app.route("/*").get(function (req, res) {
    res.redirect('/');
});

app.listen(port, function () {
    console.info(promise);
    console.info("http://localhost:" + port);
});

process.on("SIGINT", function () {
    process.kill(process.pid, "SIGTERM");
});