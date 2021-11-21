/* eslint-disable */

const userDataForm = document.querySelector('.changeMaInfo');

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('changeName').value;
    const Email = document.getElementById('changeEmail').value;

    updateSettings({ name, Email }, 'data');
  });
}
