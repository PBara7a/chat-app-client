const apikey = process.env.REACT_APP_TENOR_API_KEY;
const clientkey = process.env.REACT_APP_TENOR_CLIENT_KEY;

function httpGetAsync(theUrl, callback) {
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };

  xmlHttp.open("GET", theUrl, true);

  xmlHttp.send(null);

  return;
}

function tenorCallbackSearch(responsetext) {
  const responseObjects = JSON.parse(responsetext);

  const topGifs = responseObjects["results"];

  for (let i = 0; i < 8; i++) {
    document.getElementById(`preview-gif${i + 1}`).src =
      topGifs[i]["media_formats"]["nanogif"]["url"];
  }

  return topGifs;
}

function grabData(searchStr) {
  const lmt = 8;

  const searchUrl =
    "https://tenor.googleapis.com/v2/search?q=" +
    searchStr +
    "&key=" +
    apikey +
    "&client_key=" +
    clientkey +
    "&limit=" +
    lmt;

  httpGetAsync(searchUrl, tenorCallbackSearch);

  return;
}

export default grabData;
