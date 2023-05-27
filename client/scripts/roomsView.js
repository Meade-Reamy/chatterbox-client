// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),
  $input: $('#roomInput'),
  uniqueRooms: {},
  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    this.handleChange();
    this.handleClick();
  },

  render: function() {
    var data = Messages._data;
    for (let elem in data) {
      var currentRoom = data[elem].roomname;
      if (this.uniqueRooms[data[elem].roomname] !== true) {
        this.uniqueRooms[data[elem].roomname] = true;
        var room = data[elem].roomname;
        var $selection = $(`<option></option>`);
        if (room === null) {
          room = 'null';
        }
        $selection.attr('value', room);
        $selection.text(room);
        this.$select.append($selection);

      }

    }
    // TODO: Render out the list of rooms.
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
    // MessagesView.render(roomname);
  },

  handleChange: function(event) {
    // TODO: Handle a user selecting a different room.
    var change = function() {
      MessagesView.currentRoom = this.$select.val();
    };
    this.$select.on('change', change.bind(this));
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.

    var clicked = function() {
      var name = this.$input.val();
      if (this.uniqueRooms[name] !== true) {
        this.uniqueRooms[name] = true;
        var $selection = $('<option></option>');
        $selection.text(name);
        $selection.attr('value', name);
        this.$select.append($selection);
        this.$select.val(name).change();
        var data = {
          username: App.username,
          roomname: name,
          text: ''
        };
        Parse.create(data, function() {
          console.log('success');
        });
      }
    };

    this.$button.on('click', clicked.bind(this));
  }

};
