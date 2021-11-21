/* eslint-disable */
//CODE FOR THE SEARCH RESULTS XHR
var showResults = debounce(function(arg) {
  var value = arg.trim();
  if (value == '' || value.length <= 0) {
    $('#search-results').fadeOut();
    return;
  } else {
    $('#search-results').fadeIn();
  }
  var jqxhr = $.get('/api/v1/posts?search=' + value, function(data) {
    $('#search-results').html('');
  })
    .done(function(data) {
      if (data.length === 0 || data.status === 'fail') {
        $('#search-results').append(
          '<p class="lead text-center mt-2" id="Artumes2">No results</p>'
        );
      } else {
        $('#search-results').append('');

        data.forEach(x => {
          $('#search-results').append(
            '<a href="#"><p class="m-2 mt-0 lead" id="Artumes">' +
              x.title +
              '</p> </a>'
          );
        });
      }
    })
    .fail(function(err) {
      console.log(err);
    });
}, 300);

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
