/* eslint-disable */
const logoutbtn = document.querySelector('.nav__el--logout');

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('Error', 'Error loging out ! try again');
  }
};

if (logoutbtn) {
  logoutbtn.addEventListener('click', logout);
}

if (logoutbtn) {
  logoutbtn.addEventListener('click', logout);
}
