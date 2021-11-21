/* eslint-disable */

export const postmsg = async (name, email, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/posts/contacts',
      data: {
        name,
        email,
        message
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Message Sent Successfully😋😋');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
