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

$(function() {

  var Saying = Backbone.Model.extend({});

  var SayingsCollection = Backbone.Collection.extend({
    model: Saying,
    localStorage: new Backbone.LocalStorage("sayings-backbone")
  });

  Sayings = new SayingsCollection;

  var FavoritesView = Backbone.View.extend({
    el: $("#bobFavoriteResponses"),
    initialize: function() {
      console.log("initializing bob favorite responses view");
      this.listenTo(Sayings, 'add', this.addOne);
    },
    addOne: function(model) {
      console.log("Adding a new favorite saying");
      var html = $("#bobResponse").html();
      var template = Handlebars.compile(html);
      var templateResult = template({response: model.get("response")});

      var destination = $("#bobFavoriteResponses");
      destination.append(templateResult);
    }
  });

  var favoritesView = new FavoritesView;

  var AppView = Backbone.View.extend({
    el: $("#bobForm"),
    events: {
      "submit" : "askBob"
    },
    initialize: function() {
      console.log("initializing bob app view");
      this.listenTo(Sayings, 'add', this.addOne);
    },
    askBob: function(e) {
      e.preventDefault();
      console.log("Asking Bob Something");


      var statement = $("#askBobText").val();
      var bob = new Bob();
      var response = bob.hey(statement);
      Sayings.create({ response: response });
    },
    addOne: function(model) {
      console.log("Adding this model");
      var html = $("#bobFlashyResponse").html();
      var template = Handlebars.compile(html);
      var templateResult = template({response: model.get("response")});

      var destination = $("#bobResponses");
      destination.append(templateResult);
    }
  });

  var App = new AppView;

});