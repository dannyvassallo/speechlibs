// Speech function
function speak(element){
  element = document.getElementById(element);
  var voices = window.speechSynthesis.getVoices();
  var speechMessage = new SpeechSynthesisUtterance();
  speechMessage.voice = voices[66];
  if(element.nodeName == 'INPUT'){
    var strInputCode = element.value;
    var cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    speechMessage.text = strInputCode;
    speechSynthesis.speak(speechMessage);
  }else{
    var strInputCode = element.innerHTML;
    var cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    speechMessage.text = cleanText;
    speechSynthesis.speak(speechMessage);
  }
}

if (Meteor.isClient) {

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click .listen': function (e) {
      var $this = $(e.target);
      var id = $this.prev('input').attr('id');
      speak(id);
    },
    'click .makeIt': function () {
      $('#input-group input').each(function(){
        var spanName = $(this).attr('id');
        $('span[name='+spanName+']').html(this.value);
      });
    },
    'click .sayIt': function(){
      var id = 'content';
      speak(id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
