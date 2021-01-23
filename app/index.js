const inputName = document.getElementById('name');
const inputPassword = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-show');
const txtArea = document.getElementsByTagName('textarea')[0];
const chars = document.getElementById('chars');
const content = document.querySelector('.content');
const countDown = document.getElementById('countDown');
const clock = document.getElementById('timing');
const writer = document.getElementById('writer');
const topPage = document.getElementById('top');
const randomImg = document.getElementById('random-img');
const redirect = document.getElementById('redirect');
const hashBtn = document.getElementById('hash-btn');
const section = document.getElementById('local-storage');
const colors = document.querySelectorAll('li.color');
const colorsArr = [...colors];
const serialBtn = document.getElementById('serial');
const generatedSerial = document.querySelector('.generated'); // form
// 1 - clear placeholder

function clearPlaceHolder() {
  const placeHolder = inputName.getAttribute('placeholder');

  inputName.onblur = e => {
    e.target.placeholder = placeHolder;
  };

  inputName.onfocus = e => {
    e.target.placeholder = '';
  };
} // 2 - show/hide password


function togglePassword() {
  toggleBtn.onclick = e => {
    e.preventDefault();

    if (e.target.textContent === 'show' && inputPassword.type === 'password' && inputPassword.value !== '') {
      inputPassword.setAttribute('type', 'text');
      e.target.textContent = 'hide';
    } else if (e.target.textContent === 'hide' && inputPassword.type === 'text') {
      inputPassword.setAttribute('type', 'password');
      e.target.textContent = 'show';
    }
  };
} // 3 - the rest chars for the textArea


chars.textContent = txtArea.maxLength;

function calcRestChars() {
  // i'll use oninput event instead of on[keyup - keydown - keypress] events as them not calc the copy paste chars at once and have many issues
  txtArea.oninput = e => {
    chars.textContent = e.target.maxLength - e.target.value.length;
    chars.textContent === '0' ? chars.classList.add('warn') : chars.classList.remove('warn');
  };
} // 4 - copy content to another element


function copyContent(copiedElement, contentElement) {
  copiedElement.onkeyup = () => {
    contentElement.textContent = copiedElement.value;
  };
}
/** ************************************************************************** */
// 5 - count down


let time = 115;
const countInterval = setInterval(counter, 1000);

function counter() {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  min < 10 ? min = `0${min}` : min;
  sec < 10 ? sec = `0${sec}` : sec;
  countDown.innerText = `${min} : ${sec}`;
  time > 0 ? time -= 1 : clearInterval(countInterval);
} // 6 - time now


function timing() {
  const date = new Date(); // inter the function to get the new time every setInterval

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  hour < 10 ? `0${hour}` : hour;
  min < 10 ? `0${min}` : min;
  sec < 10 ? `0${sec}` : sec;
  clock.innerText = `${hour} : ${min} : ${sec}`;
}

setInterval(() => timing(), 1000); // 7 - type writer

const txt = "hello from the Mando's home bitches";
let i = 0;
const writerInterval = setInterval(() => {
  writer.textContent += txt[i];
  i += 1;
  if (i >= txt.length) clearInterval(writerInterval);
}, 250); // 8 - random class on body

const classes = ['red', 'blue', 'tomato', 'black'];
const randomClass = Math.floor(Math.random() * classes.length);
document.body.setAttribute('class', classes[randomClass]); // 9 - scroll top

window.onscroll = () => {
  window.scrollY > 1000 ? topPage.style.display = 'block' : topPage.style.display = 'none';
};

topPage.addEventListener('click', () => window.scrollTo(0, 0)); // 10 - capitalize function

function capitalizer(smallTxt) {
  const oldTxt = smallTxt.split(' '); // to convert to array every space

  const newTxt = [];

  for (let i = 0; i < oldTxt.length; i += 1) {
    // ['hello','from','home'] =>charAt(0)=> first letter in the i-Index only, so to compelete the word u'll use the same word from oldArr without the first letter
    newTxt.push(oldTxt[i].charAt(0).toUpperCase() + oldTxt[i].slice(1));
  }

  console.log(newTxt.join(' ')); // join(' ') => to convert array to string
} // 11 - random imgs


const imgsArr = ['images/img1.png', 'images/img2.png', 'images/img3.png', 'images/img4.png'];

function changeImgs(ele, imgs) {
  setInterval(() => {
    ele.src = imgsArr[Math.floor(Math.random() * imgs.length)];
  }, 1000);
} // BOM
// 12 - 1 - window.location => traverseing to another site


function redirectWebsite(url) {
  redirect.addEventListener('click', () => {
    url !== '' ? window.location = url : false;
  });
} // 13 - 2 - window.loction.hash => if documnetURL contain #...


const hashIs = e => {
  if (window.location.hash) {
    if (window.location.hash.indexOf('#mando') === 0) {
      e.target.textContent = 'Mando';
      console.log('good');
    } else {
      console.log('erorr');
    }
  }
}; // 14 - 3 - localStorage


const colorsData = [];
section.classList.add(localStorage.getItem('sectionColor') || 'red'); // the default value form local storge

colorsArr.forEach(ele => {
  colorsData.push(ele.getAttribute('data-color'));
  ele.addEventListener('click', () => {
    section.classList.remove(...colorsData);
    section.classList.add(ele.getAttribute('data-color')); // add to local storage

    localStorage.setItem('sectionColor', ele.getAttribute('data-color'));
  });
}); // 15 - generate serial numbers

function generateSerialNumbers() {
  const serialChars = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
  const serialLength = 10;
  let serialContent = ''; // the declare out of the loop as i'll use it out of the loop also
  // i wannaa create the serial number from 10 chars from the serialChars which is 64 chars

  for (let i = 0; i < serialLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * serialChars.length); // inter the loop as i want it to change every time the loop will run

    serialContent += serialChars.substring(randomNumber, randomNumber + 1); // from the randomNumber to  +1 => as to get one char only
  }

  generatedSerial.textContent = serialContent;
  console.log(serialChars.length);
}

document.addEventListener('DOMContentLoaded', () => {
  clearPlaceHolder();
  togglePassword();
  calcRestChars();
  copyContent(txtArea, content);
  capitalizer('hello from home');
  changeImgs(randomImg, imgsArr);
  redirectWebsite('https://reactjs.org/docs/add-react-to-a-website.html');
  hashBtn.addEventListener('click', hashIs);
  serialBtn.addEventListener('click', generateSerialNumbers);
});