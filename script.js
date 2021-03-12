const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input Min with Today Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown + Comlete UI
function updateDom() {
  const now = new Date().getTime();
  const distance = countdownValue - now;
  console.log('Distance', distance);

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  console.log(days, hours, minutes, seconds);

  //Populating Countdown
  countdownElTitle.textContent = `${countdownTitle}`;
  timeElements[0].textContent = `${days}`;
  timeElements[1].textContent = `${hours}`;
  timeElements[2].textContent = `${minutes}`;
  timeElements[3].textContent = `${seconds}`;

  // Hide input
  inputContainer.hidden = true;

  // Show Countdown
  countdownEl.hidden = false;
}

// Take vals from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
  // Get num ver of cur date
  countdownValue = new Date(countdownDate).getTime();
  console.log(
    'countdown value:',
    countdownValue + ' milliseconds from Jan 1 1970'
  );
  updateDom();
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
// just testing in console
console.log(today);
console.log(typeof today);
