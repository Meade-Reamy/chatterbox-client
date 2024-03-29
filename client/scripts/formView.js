// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    var $input = $('#message');
    var room = RoomsView.$select.val();
    room = room === 'null' ? null : room;
    var data = {
      username: App.username,
      roomname: room,
      text: $input.val()
    };
    Parse.create(data, function() {
      console.log('success');
    });

    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.

    //console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};