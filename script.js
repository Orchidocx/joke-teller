const button = document.getElementById('button');
const button2 = document.getElementById('button2');
const audioElement = document.getElementById('audio');

function tellMe(joke) {
  VoiceRSS.speech({
    key: '56baf4c2b52f4301b19ac649d0fb9dba',
    src: joke,
    hl: 'en-us',
    r: 0,
    c:'mp3',
    f:'44khz_16bit_stereo',
    ssml: false
  });
}
const apiURLsrc1 = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
const apiURLsrc2 = 'https://icanhazdadjoke.com';
async function getJokes(apiURL) {
  let joke;
  try {
    const response = await fetch(apiURL, {headers: {'Accept': 'application/json'}});
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    // TTS
    tellMe(joke);
    // Toggle button and display media
    toggleMedia();
  } catch(err) {
    return 'I cannot find a joke right now. Please try again later.';
  }
}

function toggleMedia() {
  button.disabled = !button.disabled;
  button2.disabled = !button2.disabled;
  // permanently show after first click
  audioElement.hidden = false;
}


// Event Listeners
button.addEventListener('click', () => {
  getJokes(apiURLsrc1);
});
button2.addEventListener('click', () => {
  getJokes(apiURLsrc2);
});
audioElement.addEventListener('ended', toggleMedia);