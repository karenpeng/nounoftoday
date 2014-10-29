$('#askingForInput').hide();

$.ajax({
  url: '/today',
  method: 'GET',
  dataType: 'json',
  error: function (err) {
    throw err;
  },
  success: function (data) {
    console.log(data);
    //var saying = encodeURIComponent(data.result);
    var postSentence = data.saying.replace(/\s/g, '+');
    var url = 'http://tts-api.com/tts.mp3?q=' + postSentence;
    $('#voice').attr("src", url);
    document.getElementById('voice').play();
    $('#link').attr("href", data.url);
    for (var i = 0; i < data.saying.length + 2; i++) {
      step(i);
    }

    function step(num) {
      setTimeout(function () {
        dom(num);
      }, num * 100);
    }

    function dom(num) {
      if (num < data.saying.length) {
        $('#news').append(data.saying[num].toUpperCase());
      } else if (num === data.saying.length) {
        $('#link').html("[Hyperlink]");
      } else {
        $('#askingForInput').show();
        $('#blinking').remove();
        $('<span id="blinking">_</span>').insertAfter($('#hints'));
        $('#news').removeAttr('id');
        $('#link').removeAttr('link');
      }
    }
  }
});