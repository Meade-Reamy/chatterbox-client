// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),
  data: {},
  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
  },

  fetch: function(callback = ()=>{}) {
    var output = Parse.readAll((data) => {
      // examine the response from the server request:
      //console.log(data);
      if (!Messages._data) {
        Messages._data = data;
        MessagesView.render();
      } else {
        MessagesView.renderNewMessages(App.getNewData(data));
      }
      Messages._data = data;
      RoomsView.render();
      // TODO: Use the data to update Messages and Rooms
      // and re-render the corresponding views.
    });
    callback();
    MessagesView.renderTimeago();
    setTimeout(function() {
      App.fetch();
    }, 1000);
  },

  getNewData: function(data) {
    let newData = [];
    if (Messages._data) {
      let currentId = Messages._data[0].message_id;
      return _.filter(data, function(current) {
        return current.message_id > currentId;
      });
    }
    return data;
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  floodMessages: function(count) {
    /*
      App.floodMessages(100);

      ^^ Whenever there is a bad xss ^^
    */
    if (count > 0) {
      var message = {
        username: 'XSS POLICE',
        roomname: null,
        text: 'Flooding Messages...'
      };
      Parse.create(message, function() {
        console.log('flooding: ' + count);
      });
      count--;
      var func = function() {
        App.floodMessages(count);
      };
      setTimeout(func, 1000);
    }
  }
};
