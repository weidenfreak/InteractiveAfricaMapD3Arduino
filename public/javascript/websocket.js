// where our WebSockets logic will go later
var socket, host;
var potentionmeterValue;
host = "ws://localhost:3001";

function connect() {
  try {
    socket = new WebSocket(host);

    addMessage("Socket State: " + socket.readyState);

    socket.onopen = function() {
      addMessage("Socket Status: " + socket.readyState + " (open)");
    }

    socket.onclose = function() {
      addMessage("Socket Status: " + socket.readyState + " (closed)");
    }

    socket.onmessage = function(msg) {
      //hack: because of initial "Connected to ./" info msg.data is not always a JSON object
      try {
        //set slider according to potentiometer input (msg.data)
        var year = JSON.parse(msg.data).event;
        $("#yearRange").val(year);

        // color map on websocket input (might need to refactor this call somehow)
        svg.selectAll("path")
          .transition()
          .style("fill", function(d) {
            return fillColor(d, year);
        });
      }
      catch(err){
        //nothing to do here
      }

      addMessage("Received: " + potentionmeterValue);

      // send a dummy message back to initiate
      // the onmessage callback again
      socket.send("next message please!");
    }
  } catch(exception) {
    addMessage("Error: " + exception);
  }
}

function addMessage(msg) {
  $("#chat-log").append("<p>" + msg + "</p>");
}

function send() {
  var text = $("#message").val();
  if (text == '') {
    addMessage("Please Enter a Message");
    return;
  }

  try {
    socket.send(text);
    addMessage("Sent: " + text)
  } catch(exception) {
    addMessage("Failed To Send")
  }

  $("#message").val('');
}

$(function() {
  connect();
});

$('#message').keypress(function(event) {
  if (event.keyCode == '13') { send(); }
});

$("#disconnect").click(function() {
  socket.close()
});
