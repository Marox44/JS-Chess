$(function () {
    var FADE_TIME = 150;

    // Init zaczynamy tutaj
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $chatMessages = $('.chatMessages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box

    var $loginPage = $('.loginForm'); // The login page
    var $chatPage = $('.chatArea'); // The chatroom page


    var socket, username;
    var connected = false;
    var $currentInput = $usernameInput.focus();


    function setUsername() {
        username = cleanInput($usernameInput.val().trim());

        if (username) {
            $loginPage.fadeOut();
            $chatPage.fadeIn();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            socket.emit('chat.client.addUser', username);
        }
    }

    //TODO
    function addMsg(message, options) {
        var el2 = $('<li>').addClass('chatMsg').text(message);
        var $el = $(message);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $chatMessages.prepend($el);
        } else {
            $chatMessages.append($el);
        }
        $chatMessages[0].scrollTop = $chatMessages[0].scrollHeight;
    }

    // TODO
    function addChatMsg(data, options) {
        var $usernameDiv = $('<span class="username"/>').text(data.username);
        var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

        var $messageDiv = $('<li class="chatMsg"/>').data('username', data.username).append($usernameDiv, $messageBodyDiv);

        addMsg($messageDiv, options);

    }

    // Sends a chat message
    function sendMessage() {
        var message = $inputMessage.val();
        message = cleanInput(message);

        if (message && connected) {
            $inputMessage.val('');
            addChatMsg({
                username: username,
                message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('chat.client.sendMessage', message);

        }
    }

    function cleanInput(input) {
        return $('<div/>').text(input).text();
    }

    function userCounter(data) {
        $('#counter').text("USERS ONLINE: ").append(data.numUsers);
    }


    ////////EVENTS///////////
    function initEvents() {

        ////////KEYBOARD///////////

        //TODO
        $window.keydown(function (event) {
            // Auto-focus the current input when a key is typed
            if (!(event.ctrlKey || event.metaKey || event.altKey)) {
                $currentInput.focus();
            }
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                if (username) {
                    sendMessage();
                } else {
                    setUsername();
                }
            }
        });

        // Click events

        // Focus input when clicking anywhere on login page
        $loginPage.click(function () {
            $currentInput.focus();
        });

        // Focus input when clicking on the message input's border
        $inputMessage.click(function () {
            $inputMessage.focus();
        });

    }



    /////////SOCKET EVENTS/////////////
    function initSocketEvents() {

        socket.on('chat.server.Message', function (data) {
            addChatMsg(data);
        });

        socket.on('chat.server.userJoined', function (data) {
            addMsg(data.username + ' joined');
            userCounter(data);
        });


        socket.on('chat.server.userLeft', function (data) {
            addMsg(data.username + ' left');
            userCounter(data);
        });


        socket.on('chat.server.Login', function (data) {
            connected = true;
            //            // Display the welcome message
            //            var message = "Welcome to Socket.IO Chat – ";
            //            log(message, {
            //                prepend: true
            //            });
            userCounter(data);
        });

    }









    function connectToServer() {
        //socket = io.connect("http://" + CONNECT_DATA.IP + ":" + CONNECT_DATA.PORT);
        socket = io.connect("http://127.0.0.1:3003");
    }









    function init() {
        LOG("Init started");
        connectToServer();
        LOG("Connected to server");
        initEvents();
        LOG("Events loaded");
        initSocketEvents();
        LOG("Socket events loaded");


        // addChatMsg("lolololoTEST");
        LOG("Init successful!");
    }





    function LOG(msg) {
        console.log("@CHAT - " + msg);
    }


    $(function () {
        $chatPage.hide();

        init();
    });

});