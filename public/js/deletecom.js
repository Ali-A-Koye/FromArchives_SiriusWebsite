/*eslint-disable*/

// Buttons
const deletebtn = document.querySelector('#commentdeleteo');
const deletesubmit = document.querySelector('.deleteform777');

//forms
const deleteform2 = document.querySelector('#DeleteArea');
const comform2 = document.querySelector('#NoLuckdude');
const editform2 = document.querySelector('#DisplayTimeMan');
if (deletebtn) {
  var deleteid = deletebtn.dataset.xdelete;
  var checkd = true;

  deletebtn.addEventListener('click', () => {
    if (checkd) {
      comform2.style.display = 'none';
      editform2.style.display = 'none';
      deleteform2.style.display = 'block';
      checkd = false;
    } else {
      editform2.style.display = 'none';
      comform2.style.display = 'block';
      deleteform2.style.display = 'none';
      checkd = true;
    }
  });
}
if (deletesubmit) {
  deletesubmit.addEventListener('submit', async e => {
    document.querySelector('.commentdeleter').textContent = 'Deleting...';
    e.preventDefault();
    const CommentId = deleteid;
    dlcomment(CommentId);
    document.querySelector('.commentdeleter').textContent = 'Delete Comment';
  });
}

const dlcomment = async CommentId => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/reviews/${CommentId}`
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Comment deleted!');
      window.setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
