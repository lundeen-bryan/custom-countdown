const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const timezoneOffset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - timezoneOffset)
  .toISOString()
  .slice(0, -5)
  .split('T')[0];

// Set initial value in date-picker to todays date
dateEl.setAttribute('min', today);

// Populate countdown + Comlete UI
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime() - timezoneOffset;
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input
    inputContainer.hidden = true;

    // If the countdown ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // show countdown in progress
      //Populating Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Take vals from form input
function updateCountdown(dateBox) {
  dateBox.preventDefault();
  countdownTitle = dateBox.target[0].value;
  countdownDate = dateBox.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check for valid date
  if (countdownDate < today) {
    alert(
      `Please select a date for the countdown that is greater than today's date`
    );
  } else {
    // Get num ver of cur date
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Reset all values
function reset() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // Get counrdown from localStor if avail
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
// when reset btn is pushed run reset func
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check LocalStorage
restorePreviousCountdown();
