var stompClient = null;

$(function () {
    $( "#counterButton" ).click(function() { clickButton(); });    
});

/**
 * connect to the Server
 * subscribe to the counter
 * get initial counter
 **/
function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        stompClient.subscribe('/counter/count', function (counter) {
            showCounter(counter.body);
        });
        getInitalCounter();
    });
}

/**
 * get value of the counter when the application starts
 **/
function getInitalCounter(){
    stompClient.send("/app/get");
}

/**
 * update counter in html 
 **/
function showCounter(message) {
    document.getElementById('counterValue').innerHTML = message;
}

/**
 * increment counter
 **/
function clickButton() {
    stompClient.send("/app/increment");
}

