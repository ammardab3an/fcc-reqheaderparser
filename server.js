const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5500;

router.get('/whoami', (req, res) => {

    res.json({
        "ipaddress": req.ip,
        "language": req.headers['accept-language'],
        "software": req.headers['user-agent'],
    });
});

app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path} : ${req.ip}`)
    next();
});

app.use("/public", express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/api', router);

app.use(function (req, res) {
    if (req.method.toLowerCase() === "options") {
        res.end();
    } else {
        res.status(404).type("txt").send("404 Not Found");
    }
});

app.listen(PORT, () => {
    console.log('Node is listening on port ' + PORT + '...');
});