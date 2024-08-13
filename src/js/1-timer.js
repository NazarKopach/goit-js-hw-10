import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
startBtn.setAttribute('disabled','')
let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.info({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: 'red',
        messageSize: '16',
        messageLineHeight: '30',
        position: 'topRight',
        transitionOut: 'fadeOut',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startTimer(userSelectedDate).then(() => {
    dateTimePicker.disabled = false;
  });
});

function startTimer(endDate) {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  return new Promise((resolve) => {
    timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = endDate - currentTime;
      
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        resolve();
        return;
      }

      const time = convertMs(timeDifference);
      updateTimerDisplay(time);
    }, 1000);
  });
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
