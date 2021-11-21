/* eslint-disable */
const files = document.querySelectorAll('.typeColor');

files.forEach(x => {
  if (x.textContent == 'Geology') {
    x.classList.add('soil');
  } else if (x.textContent == 'Physics') {
    x.classList.add('Physics');
  } else if (x.textContent == 'Chemistry') {
    x.classList.add('chm');
  } else if (x.textContent == 'Biology') {
    x.classList.add('biology');
  } else if (x.textContent == 'Mathematics') {
    x.classList.add('Math');
  } else if (x.textContent == 'Computer') {
    x.classList.add('com');
  }
});
