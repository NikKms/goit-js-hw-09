import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.target.elements;

  const promises = generatePromises(
    Number(delay.value),
    Number(step.value),
    Number(amount.value)
  );

  [...promises].forEach((promise, position) => {
    promise
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${promise.delay}ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${promise.delay}ms`
        );
      });
  });
}

const createPromise = delay =>
  new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(
      () => (shouldResolve ? resolve({ delay }) : reject({ delay })),
      delay
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
