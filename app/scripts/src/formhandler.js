let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function submitHandler(handlerFunction) {
  console.log('Setting submit handler for form');
  this.$formElement.on('submit', function(event) {
    event.preventDefault();

    var data = {};
    $(this).serializeArray().forEach(function (item) {
      data[item.name] = item.value;
      console.log(item.name + ' is ' + item.value);
    });
    console.log(data);
    handlerFunction(data);
    this.reset();
    this.elements[0].focus();
  });
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default{
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
