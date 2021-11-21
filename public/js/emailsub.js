/* eslint-disable */

/* eslint-disable */
const subscriptionform = document.querySelector('.subemail');

if (subscriptionform) {
  subscriptionform.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('subemail').value;
    subscription(email);
  });
}

const subscription = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts/email',
      data: {
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Thanks For Subscribing😋');
    }
  } catch (err) {
    showAlert('Error', err.response.data.message);
  }
};
