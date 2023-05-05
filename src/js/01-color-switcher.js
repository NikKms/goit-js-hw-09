const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorChange);
refs.stopBtn.addEventListener('click', stopColorChange);

refs.stopBtn.disabled = true;
let intervalID = null;

function startColorChange() {
  intervalID = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 500);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function stopColorChange() {
  clearInterval(intervalID);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
