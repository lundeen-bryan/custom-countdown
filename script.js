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
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

console.log(new Date());
// shows current date/time on local machine

const timezoneOffset = new Date().getTimezoneOffset() * 60000;
console.log(timezoneOffset);
// the return is 480 minutes ahead of local time so 60,000 miliseconds are in a minute so multiply that by the timezoneoffset to get the actual time difference between local and GMT.

const today = new Date(Date.now() - timezoneOffset)
  .toISOString()
  .slice(0, -5)
  .split('T')[0];
console.log(today);
// Expected local machine date

const curTime = new Date(Date.now() - timezoneOffset)
  .toISOString()
  .slice(0, -5)
  .split('T')[1];
console.log(curTime);
// Expected local machine time after adjusting for timezone

dateEl.setAttribute('min', today);

// Populate countdown + Comlete UI
function updateDom() {
  countdownActive = setInterval(() => {
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
  }, second);
}

// Take vals from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
  // Check for valid date
  if (countdownDate < today) {
    alert(
      `Please select a date for the countdown that is greater than today's date`
    );
  } else {
    // Get num ver of cur date
    countdownValue = new Date(countdownDate).getTime();
    console.log(
      'countdown value:',
      countdownValue + ' milliseconds from Jan 1 1970'
    );
    updateDom();
  }
}

// Reset all values
function reset() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  // Stop countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = '';
  countdownDate = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
// just testing in console
console.log(today);
console.log(typeof today);
countdownBtn.addEventListener('click', reset);
