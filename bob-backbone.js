$(function() {

  Bob = function() {
    this.hey = function(message) {
      if (this.isSilence(message)) {
        return "Fine, be that way.";
      } else if (this.isShouting(message)) {
        return "Woah, chill out!";
      } else if (this.isAQuestion(message)) {
        return "Sure";
      } else {
        return 'Whatever';
      }
    };

    this.isSilence = function(message) {
      return message === "";
    }

    this.isShouting = function(message) {
      return message.toUpperCase() === message;
    }

    this.isAQuestion = function(message) {
      return message[message.length -1] === "?";
    }
  };

  var SayingsView = Backbone.View.extend({
    el: $("#bobForm"),
    events: {
      "submit" : "createSaying"
    },
    initialize: function() {
      console.log("Initialize the Bob Sayings");
    },
    createSaying: function(e) {
      e.preventDefault();
      console.log("create saying");

      var template = Handlebars.compile( $("#bobResponse").html() );

      var statement = $("#askBobText").val();
      var bob = new Bob();
      var response = bob.hey(statement);

      var data = template({ response: response });
      $("#bobResponses").append(data);
    }
  });

  var BobSayings = new SayingsView;

});