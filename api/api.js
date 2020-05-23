const _ = require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var db = require('./modules/daomodule');
//var dbMysql = require('./modules/daoMysqlModule);
var TODOS = [
    { 'id': 1, 'user_id': 1, 'name': "Get Milk", 'completed': false },
    { 'id': 2, 'user_id': 1, 'name': "Fetch Kids", 'completed': true },
    { 'id': 3, 'user_id': 2, 'name': "Buy flowers for wife", 'completed': false },
    { 'id': 4, 'user_id': 3, 'name': "Finish Angular JWT Todo App", 'completed': false },
];
var USERS = [
    { 'id': 1, 'username': 'gustavo', 'password': '123' },
    { 'id': 2, 'username': 'paul' , 'password': '123' }
];



function getTodos(userID){
    var todos = _.filter(TODOS, ['user_id', userID]);
    return todos;
}

function getTodo(todoID) {
    var todo = _.find(TODOS, function (todo) { return todo.id == todoID; })
    return todo;
}

function getUsers(){
    return USERS;
}

app.use(bodyParser.json());
app.use(expressJwt({secret: 'fdsfljalfldajfldafjdlkafljdaa'}).unless({path: ['/api/auth']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});

app.post('/api/auth', function(req, res) {
    const body = req.body;
    const user = USERS.find(user => user.username == body.username);
    if(!user || body.password != '123') return res.sendStatus(401);
    var token = jwt.sign({userID: user.id}, 'fdsfljalfldajfldafjdlkafljdaa', {expiresIn: '2h'});
    res.send({token});
});

app.get('/api/todos', function (req, res){
    res.type('json');
    res.send(getTodos(req.user.userID));
});

app.get('/api/todos/:id', function (req, res){
    var todoID = req.params.id;
    res.type('json');
    res.send(getTodo(todoID));
});

app.get('/api/users', function (req, res){
    res.type('json');
    res.send(getUsers());
});

app.get('/api/createcollections', function (req, res){
    res.type('json');
    console.log("Criando UserCollection");
    db.createUsersColetion();
    console.log("Inserindo informacao no Users Collection");
    db.createUsers(USERS);
    console.log("Listando todos os usuários");
    db.dbGetAllUsers( function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.get('/api/getAllUsers', function (req, res){
    res.type('json');
    db.dbGetAllUsers( function(err, value) {
        if (err) throw err;
        console.log(value);
        res.send(value);
    });
});

app.listen(4000, function(){
    console.log('Listening on por 4000');
});

