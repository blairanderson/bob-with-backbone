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

  var Saying = Backbone.Model.extend({});

  var SayingsCollection = Backbone.Collection.extend({
    model: Saying,
    localStorage: new Backbone.LocalStorage("sayings-backbone")
  });

  var Sayings = new SayingsCollection;

  var SayingsView = Backbone.View.extend({
    el: $("#bobForm"),
    events: {
      "submit" : "createSaying"
    },
    initialize: function() {
      console.log("Initialize the Bob Sayings");

      this.listenTo(Sayings,'add',this.addOne);
    },
    createSaying: function(e) {
      e.preventDefault();
      console.log("create saying");
      var statement = $("#askBobText").val();
      var bob = new Bob();
      var response = bob.hey(statement);

      Sayings.create({ statement: statement, response: response });


    },
    addOne: function(saying) {
      console.log("add one");
      var template = Handlebars.compile( $("#bobResponse").html() );
      var data = template({ response: saying.get("response") });
      $("#bobResponses").append(data);
    }
  });

  var BobSayings = new SayingsView;

});