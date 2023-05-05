import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector('[data-start]'),
  timerElements: document.querySelectorAll('.value'),
};

refs.startButton.disabled = true;

refs.startButton.addEventListener('click', startTimer);

let selectedDateTime = null;
let timerIsRunning = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onOpen([selectedDates]) {
    Notiflix.Notify.warning('Выберите дату и время в будущем');
  },
  onClose([selectedDates]) {
    console.log(selectedDates);
    if (!selectedDates || selectedDates <= Date.now()) {
      Notiflix.Notify.failure('Отклонено, старт отложен, не корректная дата!');
      refs.startButton.disabled = true;
    } else {
      Notiflix.Notify.success('Все ОК, нажми старт =)');
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
  Notiflix.Loading.pulse();

  const animationTime = 2000;
  setTimeout(() => {
    Notiflix.Loading.remove();
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
  }, animationTime);
}

function updateTimer(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  console.log(remainingTime);

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
