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
//-------------------------------
$(document).ready(function() {
  $('.moreBox')
    .slice(0, 9)
    .show();
  if ($('.moreBox2:hidden').length != 0) {
    $('#loadMore').show();
  }
  $('#loadMore').on('click', function(e) {
    e.preventDefault();
    $('.moreBox:hidden')
      .slice(0, 9)
      .slideDown();
    if ($('.moreBox:hidden').length == 0) {
      $('#loadMore').fadeOut('slow');
    }
  });
});

$(document).ready(function() {
  $('.moreBox2')
    .slice(0, 9)
    .show();
  if ($('.moreBox2:hidden').length != 0) {
    $('#loadMore2').show();
  }
  $('#loadMore2').on('click', function(e) {
    e.preventDefault();
    $('.moreBox2:hidden')
      .slice(0, 9)
      .slideDown();
    if ($('.moreBox2:hidden').length == 0) {
      $('#loadMore2').fadeOut('slow');
    }
  });
});
