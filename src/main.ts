const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

if (!btn1 || !btn2 || !btn3 || !btn4) throw new Error('ボタンの要素が存在しない');

const check1 = document.getElementById('check1');
const check2 = document.getElementById('check2');
const check3 = document.getElementById('check3');
const check4 = document.getElementById('check4');

const notesList: {
  lane: number;
  height: number;
}[] = [];

// let intervalId: number | undefined = undefined

function createNotes(lane: HTMLElement) {
  notesList.push({
    lane: Math.floor(Math.random() * 4),
    height: 0,
  });
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
  }, 2);
  note.dataset.intervalId = String(intervalId);
}

document.getElementById('start-btn')!.addEventListener('click', () => {
  const lane1 = document.getElementById('lane1');
  const lane2 = document.getElementById('lane2');
  const lane3 = document.getElementById('lane3');
  const lane4 = document.getElementById('lane4');
  const ary = [lane1, lane2, lane3, lane4];
  setInterval(
    () => {
      let num = Math.floor(Math.random() * ary.length);
      createNotes(ary[num]!);
    },
    (60 / 256) * 1000
  );
});

function isIntersecting(rect1: DOMRect, rect2: DOMRect) {
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

function checkForHits(button: HTMLElement) {
  const notes = document.querySelectorAll('.note');
  const buttonRect = button.getBoundingClientRect();
  let hitDetected = false;

  notes.forEach((note: any) => {
    const noteRect = note.getBoundingClientRect();
    if (isIntersecting(noteRect, buttonRect)) {
      const intervalId = note.dataset.intervalId;
      note.remove();
      clearInterval(Number(intervalId));
      hitDetected = true;
    }
  });
  return hitDetected;
}

// function handleButtonClick(btnN: HTMLElement) {
//   const hitDetected = checkForHits(btnN);

//   // if(!hitDetected){

//   // }
// }

btn1.addEventListener('click', () => checkForHits(btn1));
btn2.addEventListener('click', () => checkForHits(btn2));
btn3.addEventListener('click', () => checkForHits(btn3));
btn4.addEventListener('click', () => checkForHits(btn4));
