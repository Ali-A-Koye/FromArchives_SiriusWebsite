/*eslint-disable*/
const edit = document.querySelector('#editcomxd');
const com = document.querySelector('#editComOne');
const comformo = document.querySelector('.deathtoprimes');
const deleteform = document.querySelector('#DeleteArea');

if (edit) {
  var dataa = edit.dataset.x;
  var commento = edit.dataset.valueone;

  const editform = document.querySelector('#DisplayTimeMan');
  const comform = document.querySelector('#NoLuckdude');
  var check = true;
  edit.addEventListener('click', () => {
    if (check) {
      editform.style.display = 'block';
      comform.style.display = 'none';
      deleteform.style.display = 'none';
      check = false;
      com.setAttribute('value', commento);
      com.textContent = commento;
    } else {
      deleteform.style.display = 'none';
      comform.style.display = 'block';
      editform.style.display = 'none';
      check = true;
    }
  });
  if (comformo) {
    comformo.addEventListener('submit', async e => {
      document.querySelector('.commentchanger').textContent = 'Updating...';
      e.preventDefault();
      const CommentId = dataa;
      const comment = com.value;
      await editcmnt(CommentId, comment);
      document.querySelector('.commentchanger').textContent = 'Change Comment';
    });
  }
}
const editcmnt = async (CommentId, review) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${CommentId}`,
      data: {
        review
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Comment Changed Successfully');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
