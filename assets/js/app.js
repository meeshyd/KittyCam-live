(function() {
  var channel = 'kitty';

  // get your own keys at https://pubnub.com
  var pubnub = PUBNUB.init({
    subscribe_key: 'sub-c-64ab6baa-8d1d-11e7-980d-9ed76efe37f8',
    publish_key: 'pub-c-4a3aba1b-781e-469d-bf32-f38b01a704cc'
  });

  pubnub.subscribe({
    channel: channel,
    restore: true,
    connect: getHistory,
    disconnect: function(res){
      console.log('disconnected');
    },
    reconnect: function(res){
      console.log('reconnecting to PubNub');
    },
    callback: function(m) { 
      if(m.image) {
        displayPhoto(m);
      }
    }
  });

  function getHistory() {
    pubnub.history({
      channel  : channel,
      count: 80,
      callback : function(messages) {
        messages[0].forEach(function(m){ 
          displayPhoto(m);
        });
      }
    });
  }

  function displayPhoto(m) {
    var time = new Date(m.timestamp).toLocaleString();

    var photo =  document.createElement('div');
    photo.setAttribute('class', 'photo');

    var elem = document.createElement('img');
    elem.setAttribute('src', m.image);

    elem.addEventListener('error', function(e){ 
      // broken image
      this.parentNode.style.display = 'none';
    })

    var text = document.createElement('figcaption');
    text.textContent = time;

    photo.appendChild(elem);
    photo.appendChild(text);

    var parentElement = document.getElementById('photos');
    var firstChild = parentElement.firstChild;
    parentElement.insertBefore(photo, firstChild);
  }

})();