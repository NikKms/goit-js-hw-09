const refs = {
  body: document.body,
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.body.addEventListener('click', handlerBtn);
refs.body.style.textAlign = 'center';

let intervalID = null;

function startColorChange() {
  intervalID = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 500);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function stopColorChange() {
  clearInterval(intervalID);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function handlerBtn({ target }) {
  if (target === refs.startBtn) startColorChange();
  else if (target === refs.stopBtn) stopColorChange();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
