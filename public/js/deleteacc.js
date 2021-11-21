/* eslint-disable */

const deleteaccforms = document.querySelector('.xdsdsd');

if (deleteaccforms) {
  deleteaccforms.addEventListener('submit', e => {
    e.preventDefault();
    active = false;
    updateSettings({ active }, 'data');
  });
}
