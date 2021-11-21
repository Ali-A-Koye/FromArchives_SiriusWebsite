/* eslint-disable */

const userDataForm = document.querySelector('.changeMaInfo');

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('changeName').value);
    form.append('Email', document.getElementById('changeEmail').value);
    form.append('likes', document.getElementById('changelikesh').value);
    form.append('bio', document.getElementById('bioh').value);
    form.append('photo', document.getElementById('photoou').files[0]);
    updateSettings(form, 'data');
  });
}

if (document.getElementById('photoou')) {
  document.getElementById('photoou').addEventListener('change', () => {
    const text = document.getElementById('photoou').value;
    let text2 = text.split('\\')[2];
    if (text2.length > 40) {
      text2 = `${text2.substring(0, 35)}...${text2.substring(
        text2.length - 3,
        text2.length
      )}`;
    }

    document.getElementById('ioerjfoerijgoijer').innerText = text2;
    if (document.getElementById('breffr')) {
      document.getElementById('breffr').textContent = 'Uploaded 🙂🙂';
      document.getElementById('breffr').style.backgroundColor = 'green';
    }
  });
}
