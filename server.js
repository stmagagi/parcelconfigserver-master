let express = require("express");
let app = express();
let port = 8081;

app.use(express.static('./'));

app.route('/*').get(function (req, res) {
    res.redirect('/');
});

app.listen(port, function () {
    console.info("http://localhost:" + port);
});