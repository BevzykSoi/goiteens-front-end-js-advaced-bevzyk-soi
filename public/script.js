const socket = io();
const refs = {
  authForm: document.querySelector("#authForm"),
  messageForm: document.querySelector("#messageForm"),
  messagesList: document.querySelector("#messagesList"),
};

let user = null;

function createMessageHtml(message) {
  return `<div class="list-group-item ${
    message.user._id === user._id ? "active" : ""
  }">
    <h5>${message.user.username}</h5>
    <p>${message.text}</p>
  </div>`;
}

refs.messageForm.elements.submitBtn.disabled = true;

refs.authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const loginBtn = event.target.elements.submitBtn;

    loginBtn.disabled = true;
    socket.emit('login', username, (res) => {
        if (res.status === 200) {
            user = res.data;
            refs.messageForm.elements.submitBtn.disabled = false    ;
            refs.authForm.remove();
        }
    });
});

refs.messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = event.target.elements.text.value;
    const sendBtn = event.target.elements.submitBtn;

    sendBtn.disabled = true;
    socket.emit('create new message', text, user._id);
});

socket.on("create new message", (message) => {
    const html = createMessageHtml(message);
    refs.messagesList.insertAdjacentHTML('afterbegin', html);
});