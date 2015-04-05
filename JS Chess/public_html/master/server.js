var PORT = 3003;
var util = require("util");
var io = require("socket.io");
var socket;


var usernames = {};
var numUsers = 0;

function initServer() {
    socket = io.listen(PORT);
}

function initEvents() {
    socket.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(client) {
    var addedUser = false;
    util.log("New connection from " + client.request.connection.remoteAddress + " id: " + client.id);

    //1.
    // when the client emits 'add user', this listens and executes
    client.on('chat.client.addUser', function (username) {
        addedUser = true;
        // we store the username in the socket session for this client
        client.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        numUsers++;
        socket.emit('chat.server.Login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        client.broadcast.emit('chat.server.userJoined', {
            username: client.username,
            numUsers: numUsers
        });
    });

    //2.
    // when the client emits 'new message', this listens and executes
    client.on('chat.client.sendMessage', function (data) {
        // we tell the client to execute 'new message'
        client.broadcast.emit('chat.server.Message', {
            username: client.username,
            message: data
        });
    });


    //3.
    // when the user disconnects.. perform this
    client.on('disconnect', function () {
        // remove the username from global usernames list
        if (addedUser) {
            delete usernames[client.username];
            --numUsers;

            // echo globally that this client has left
            client.broadcast.emit('chat.server.userLeft', {
                username: client.username,
                numUsers: numUsers
            });
        }
    });
}









function init() {
    util.log("Init started");

    initServer();
    util.log("Init server...");
    initEvents();
    util.log("Init events...");





    util.log("Init completed!");
}


init();