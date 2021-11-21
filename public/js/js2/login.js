/* eslint-disable */
const loginForm = document.querySelector('.loginform');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const Email = document.getElementById('InputEmail1').value;
    const Password = document.getElementById('InputPassword1').value;
    login(Email, Password);
  });
}

const login = async (Email, Password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        Email,
        Password
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
