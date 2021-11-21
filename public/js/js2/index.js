/* eslint-disable */
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('#sticker').insertAdjacentHTML('beforeend', markup);
  window.setTimeout(hideAlert, 5000);
};

const postmsg = async (name, email, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/posts/contacts',
      data: {
        name,
        email,
        message
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Message Sent Successfully😋😋');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};

const msgbtn = document.querySelector('.fromsbt');

if (msgbtn) {
  msgbtn.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    postmsg(name, email, message);
  });
}
