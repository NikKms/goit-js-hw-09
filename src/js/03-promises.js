import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
};

let promises = [];

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.target.elements;

  promises = generatePromises(
    Number(delay.value),
    Number(step.value),
    Number(amount.value)
  );

  promises.forEach((promise, position) => {
    const promiseDelay = Number(delay.value) + position * Number(step.value);
    promise
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${promiseDelay}ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${promiseDelay}ms`
        );
      });
  });
}

const createPromise = promiseDelay =>
  new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(
      () =>
        shouldResolve
          ? resolve({ delay: promiseDelay })
          : reject({ delay: promiseDelay }),
      promiseDelay
    );
  });

const generatePromises = (delay, step, amount) => {
  const promises = [];
  for (let i = 0; i < amount; i += 1) {
    const promiseDelay = delay + i * step;
    promises.push(createPromise(promiseDelay));
  }
  return promises;
};
