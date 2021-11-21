/* eslint-disable */
const userPasswordForm = document.querySelector('.ChangingPassword');

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    document.querySelector('.buttonSavePass').textContent = 'Updating...';
    e.preventDefault();
    const passwordCurrent = document.getElementById('CurrentPassword').value;
    const Password = document.getElementById('newPassword').value;
    const PasswordConfirm = document.getElementById('newPasswordConfirm').value;

    await updateSettings(
      { passwordCurrent, Password, PasswordConfirm },
      'password'
    );
    document.querySelector('.buttonSavePass').textContent = 'Change Password';
    document.getElementById('CurrentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('newPasswordConfirm').value = '';
  });
}

//type is either password or  data
const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data: data
    });
    if (res.data.status === 'success') {
      if (data.active === false) showAlert('success', `Account deleted`);
      else
        showAlert('success', `${type.toUpperCase()} Changed Successfully 😎😎`);

      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
