import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; 

const submitFormEl = document.querySelector('.form')
 function submitForm (event) {
      event.preventDefault();
      const delay = parseInt(event.target.delay.value);
      const state = event.target.state.value;

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      promise
          .then((delay) => {
            iziToast.info({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: 'green',
        messageSize: '16',
        messageLineHeight: '30',
        position: 'topRight',
        transitionOut: 'fadeOut',
      });
        })
          .catch((delay) => {
            iziToast.info({
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: 'red',
        messageSize: '16',
        messageLineHeight: '30',
        position: 'topRight',
        transitionOut: 'fadeOut',
      });
        });
    }

submitFormEl.addEventListener('submit', submitForm);