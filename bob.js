BobController = function(button,inputText,output,outputTemplate) {
  console.log("Setting up the Bob Controller");
  this.button = $(button);
  this.input = $(inputText);
  this.output = $(output);
  this.outputTemplate = $(outputTemplate);

  this.getStatement = function() {
    return this.input.val();
  }
  this.responseTemplate = function() {
    if (this.responseTemplateInstance === undefined) {
      var source = this.outputTemplate.html();
      this.responseTemplateInstance = Handlebars.compile(source);
    }

    return this.responseTemplateInstance;
  }

  this.appendResponse = function(response) {
    var template = this.responseTemplate();
    var html = template({response: response});
    // var outputResponse = "<li>" + response + "</li>";
    this.output.append(html);
  }

  // var that = this;
  //
  // this.button.on("click",function(e) {
  //   // this button
  //   debugger
  //   e.preventDefault();
  //   var bob = new Bob();
  //   var response = bob.hey(that.getStatement());
  //   that.appendResponse(response);
  // });

  var whenTheButtonIsClicked = function(e) {
    // this button
    debugger
    e.preventDefault();
    var bob = new Bob();
    var response = bob.hey(that.getStatement());
    this.appendResponse(response);
  };

  this.button.on("click",$.proxy(whenTheButtonIsClicked,this));
};

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

  var bobController = new BobController('#askBob','#askBobText','#bobResponses','#bobFlashyResponse');

});