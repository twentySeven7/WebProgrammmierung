var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json());

var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

 
app.post('/users', function (req, res) {
    fs.readFile(__dirname + "/users/" + "users.json", 'utf-8', function (err, data) {
        
        data = JSON.parse(data);
        data.push(req.body);
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname + "/users/" + "users.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

})

app.get('/users/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/users/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        for(userTest in users){
            if(req.params.id == JSON.stringify(users[userTest].id)){
                res.end(JSON.stringify(users[userTest]));
            }
        }
    });
})

app.delete('/users/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/users/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        for(userTest in data){
            if(req.params.id == JSON.stringify(data[userTest].id)){
                data.splice(userTest,1);
            }
        }
        delete data["user" + req.params.id];
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname + "/users/" + "users.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
})

app.get('/users', function (req, res) {
    fs.readFile(__dirname + "/users/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})