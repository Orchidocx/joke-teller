const button = document.getElementById('button');
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

async function getJokes() {
  const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
  let joke;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    // TTS
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch(err) {
    return 'I cannot find a joke right now. Please try again later.';
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);