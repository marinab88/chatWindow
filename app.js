const chatWindow = document.getElementById('chat');
const sendButton = document.getElementById('sendButton');
const inputValue = document.getElementById('input');

let messages = [];

function initChat() {
  let chatHidden = !!localStorage.getItem('chatHidden');
  if(!chatHidden) {
    openChat();
  }
  sendButton.addEventListener('click', sendMessage);
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
 
let content = inputValue.value;
messages.push(content);

console.log(messages);
console.log(content);

// reset the input value
inputValue.value = '';

}
