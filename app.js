const chatWindow = document.getElementById('chat');
// const sendButton = document.getElementById('sendButton');
const sendButton = chatWindow.children[2].firstElementChild.lastElementChild;
// const inputValue = document.getElementById('input');
// const inputValue = document.querySelector('#chat input');
// HW3: try to find the input descending through the hierarchy
const inputValue = chatWindow.children[2].firstElementChild.firstElementChild;
// const chatBody = document.querySelector('#chat .chat-body');
const chatBody = chatWindow.children[1];

let messages = [];

function initChat() {
  let chatHidden = !!localStorage.getItem('chatHidden');
  if (!chatHidden) {
    openChat();
  }
  sendButton.addEventListener('click', sendMessage);

  let message_json = localStorage.getItem('messages');
  if (message_json != null) {
    messages = JSON.parse(message_json);
  }

  renderMessages();
}

function openChat() {
  chatWindow.classList.remove('hidden');
  localStorage.removeItem('chatHidden');
}

function closeChat() {
  chatWindow.classList.add('hidden');
  localStorage.setItem('chatHidden', true);
}

initChat();


// HW2: Create a function "sendMessage"
// which should be fired when the user clicks on the button,
// or hits Enter key on input 
// the function should read the input value and add it to the end of an array called 'messages'

function sendMessage(e) {
  e.preventDefault();

  // let content = inputValue.value;
  let message = {
    content: inputValue.value,

    // HW6: add a property which contains the date
    //  hint: Date()
    // when the messages are rendered show hh:mm:ss
    date: renderClock()
  }
  messages.push(message);
  // console.log(message);
  // reset the input value
  inputValue.value = '';

  renderMessages();
  saveMessages();

}

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function renderMessages() {
  let html = '<ul>';

  // for (let i=Math.max(messages.length - 7,0); i<messages.length;i++) {
  //   html += `<li>${messages[i].content} <span >${messages[i].date} </span></li>`;
  // }

  // HW5: rewrite the loop code using Array.forEach()
  messages.forEach((message, i) => {
  
    if ( i >= messages.length -7 ) {
   
      html += `<li>${message.content} <span >${message.date} </span></li>`;

    }
  });

  html += '</ul>';
  chatBody.innerHTML = html;

}

function renderClock() {
  let date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  let clock = `${hours}:${minutes}:${seconds}`;

  return clock;
}

/*
    EVENT ()
      v
      v
    <element> ------> customEventHandler (sendMessage)
            x  ------> defaultAction() se reseteaza toate starile
            ^
            ^
            preventDefault()
*/
