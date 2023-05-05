import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector('[data-start]'),
  timerElements: document.querySelectorAll('.value'),
};

refs.startButton.addEventListener('click', startTimer);

const {
  Notify: { failure },
} = Notiflix;

let selectedDateTime = null;
let timerIsRunning = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    console.log(selectedDates);
    if (selectedDates < Date.now()) {
      failure('Please choose a date in the future');
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
      selectedDateTime = selectedDates;
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  if (timerIsRunning) {
    return;
  }

  const currentDate = Date.now();
  let remainingTime = selectedDateTime ? selectedDateTime - currentDate : 0;

  const intervalId = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerIsRunning = false;
      return;
    }

    updateTimer(remainingTime);
    remainingTime -= 1000;
  }, 1000);

  timerIsRunning = true;
}

function updateTimer(remainingTime) {
  console.log(remainingTime);
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  [...refs.timerElements].forEach(el => {
    if (el.hasAttribute('data-days')) {
      el.textContent = pad(days);
    } else if (el.hasAttribute('data-hours')) {
      el.textContent = pad(hours);
    } else if (el.hasAttribute('data-minutes')) {
      el.textContent = pad(minutes);
    } else if (el.hasAttribute('data-seconds')) {
      el.textContent = pad(seconds);
    }
  });
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
