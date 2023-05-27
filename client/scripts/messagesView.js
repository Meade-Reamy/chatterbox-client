// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),
  currentRoom: 'null',
  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },
  //<script>$('body').css("background-image", 'url(https://i.pinimg.com/originals/e9/bd/71/e9bd71bac8e86ffa192dec224a3ee16f.png)')</script>
  render: function(data) {
    // TODO: Render _all_ the messages.
    var messages = Messages._data;
    for (let elem in messages) {
      if (this.currentRoom === 'null' || messages[elem].roomname === this.currentRoom) {
        MessagesView.renderMessage(messages[elem]);
      }
    }

    // setTimeout(function() {
    //   $('#chats').empty();
    //   App.fetch();
    // }, 5000);
  },

  createTemplate: function(message) {
    var $message = $('<div class="chat"></div>');
    var $user = $('<div></div>');
    var $handle = $('<div class="userhandle"></div>');
    var $username = $('<div class="username"></div>');
    var $text = $('<div class="messagetext"></div>');
    var $room = $('<div class="roomname"></div>');
    var $timeago = $('<time class="timeago">just now</time>');
    $message.on('click', function() {
      Friends.toggleFriend(message.username);
      $('#chats').empty();
      MessagesView.render();
    });
    $handle.text('@' + message.github_handle);
    $room.text(message.roomname);
    $message.append($room);
    $username.text(message.username);
    $text.text(message.text);
    $user.append($username);
    $user.append($handle);
    $timeago.attr('class', 'timeago');
    $timeago.attr('datetime', message.created_at);
    $timeago.timeago('update', message.created_at);
    $message.append($user);
    $message.append($text);
    $message.append($timeago);
    if (Friends.checkFriend(message.username)) {
      $username.css('color', 'rgb(255, 120, 253)');
    }
    return $message;
  },

  renderTimeago: function() {
    // var $allChats = ('#chats').children();
    // for (let i = 0; i < $allChats.length; i++) {

    // }
    $('.timeago').timeago();
  },

  renderMessage: function(message) {
    // TODO: Render a single message.
    $('#chats').append(this.createTemplate(message));
  },

  renderNewMessages: function(messages) {
    for (let i = 0; i < messages.length; i++) {
      if (this.currentRoom === 'null' || messages[i].roomname === this.currentRoom) {
        $('#chats').prepend(this.createTemplate(messages[i]));
      }
    }
  },

  handleClick: function(event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
  }

};