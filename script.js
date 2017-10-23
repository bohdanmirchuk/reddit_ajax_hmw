var get = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
 
  xhr.onreadystatechange = function () {
    if (xhr.readyState != xhr.DONE) return;
 
      var status = xhr.status;
      var headers = xhr.getAllResponseHeaders();
      var text = xhr.responseText;
 
      callback(status, headers, text);
  }
 
  xhr.send();
}
 
var appendImage = function (url) {
  var imgEl = document.createElement('img');
  imgEl.src = url;
  imgEl.onerror = function () {
    imgEl.style.display = "none";
  }
  document.getElementById('images').appendChild(imgEl);
}
 
var getImages = function (params) {
  params = {};
  params.limit = params.limit || 100;
  params.category = params.category || 'cats';
  var url = 'https://www.reddit.com/r/pics/search.json?q=';
  url += params.category;
  url += '&limit='+ params.limit;

  get(url, function (status, headers, body) {
    var response = JSON.parse(body);
    _.each(response.data.children, function (child) {
      var url = child.data.url;
      appendImage(url);
          console.log('ITEM!', child.data.url);
        });

    });
  return false;
}
                 