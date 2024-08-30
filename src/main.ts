const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

function createNote(lane) {
  const note = document.createElement('div');
  note.classList.add('note');
  lane.appendChild(note);
  let position = 0;
  const intervalId = setInterval(() => {
    position += 2;
    note.style.top = position + 'px';

    if (position > window.innerHeight) {
      clearInterval(intervalId);
      if (note.parentElement === lane) {
        lane.removeChild(note);
      }
    }
  }, 16);
  note.dataset.intervalId = intervalId;
}

document.getElementById('start-btn').addEventListener('click', () => {
  const lane1 = document.getElementById('lane1');
  const lane2 = document.getElementById('lane2');
  const lane3 = document.getElementById('lane3');
  const lane4 = document.getElementById('lane4');
  const ary = [lane1, lane2, lane3, lane4];
  setInterval(() => {
    let num = Math.floor(Math.random() * ary.length);
    createNote(ary[num]);
  }, 2000);
});

function isIntersecting(rect1, rect2) {
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

function checkForHits(button) {
  const notes = document.querySelectorAll('.note');
  const buttonRect = button.getBoundingClientRect();
  let hitDetected = false;

  notes.forEach((note) => {
    console.log(note);
    const noteRect = note.getBoundingClientRect();
    if (isIntersecting(noteRect, buttonRect)) {
      clearInterval(interval);
      if (note.parentElement) {
        note.remove();
        clearInterval(Number(note.dataset.intervalId));
      }
      hitDetected = true;
    }
  });
  return hitDetected;
}

function handleButtonClick(btnN) {
  const hitDetected = checkForHits(btnN);

  // if(!hitDetected){

  // }
}

btn1.addEventListener('click', () => checkForHits(btn1));
btn2.addEventListener('click', () => checkForHits(btn2));
btn3.addEventListener('click', () => checkForHits(btn3));
btn4.addEventListener('click', () => checkForHits(btn4));
