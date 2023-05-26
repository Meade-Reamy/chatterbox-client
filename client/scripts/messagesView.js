// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },
  //<script>$('body').css("background-image", 'url(https://i.pinimg.com/originals/e9/bd/71/e9bd71bac8e86ffa192dec224a3ee16f.png)')</script>
  render: function(data, roomname) {
    // TODO: Render _all_ the messages.
    var messages = Messages._data;
    console.log('data: ', messages);
    for (let elem in messages) {
      if (messages[elem].roomname === roomname || roomname === undefined) {
        MessagesView.renderMessage(messages[elem]);
      }
    }

    setTimeout(function() {
      $('#chats').empty();
      App.fetch();
    }, 5000);
  },

  renderMessage: function(message) {
    // TODO: Render a single message.
    var template = MessageView.render({
      username: message.username,
      message: message.text
    });
    var $message = $('<div class="chat"></div>');
    var $username = $('<div class="username"></div>');
    var $text = $('<div></div>');
    $username.text(message.username);
    $text.text(message.text);
    $message.append($username);
    $message.append($text);
    $('#chats').append($message);
  },

  handleClick: function(event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
  }

};