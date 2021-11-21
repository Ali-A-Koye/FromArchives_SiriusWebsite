/* eslint-disable */
const changepasswordstuff = document.querySelector('#choosenewpassfew');
const chaasswweiordstuff = document.querySelector('#eofijweij');
const sendto = chaasswweiordstuff.dataset.ssid;

if (changepasswordstuff) {
  changepasswordstuff.addEventListener('submit', async e => {
    document.querySelector('#newpasswordBtn').textContent = 'Changing...';
    e.preventDefault();
    const password = document.getElementById('newpasswordreset').value;
    const PassswordConfirm = document.getElementById('confnewpassreset').value;
    await chosenewpass(password, PassswordConfirm);
    document.querySelector('#newpasswordBtn').textContent = 'Change Password';
  });
}

const chosenewpass = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${sendto}`,
      data: {
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password changed Successfully');
      window.setTimeout(() => {
        location.assign('/me');
      }, 3000);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
