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
    (120 / 128) * 1000
  );
});

function isIntersecting(rect1: DOMRect, rect2: DOMRect) {
  // return !(
  //   // Math.sqrt(rect1.bottom*rect1.bottom - rect2.top*rect2.top)<0.02 ||
  //   // Math.sqrt(rect1.top*rect1.top - rect2.bottom*rect2.bottom)<0.02 ||
  //   // rect1.right < rect2.left ||
  //   // rect1.left > rect2.right

  // );
  const rect1_x = (rect1.width + rect1.left) / 2;
  const rect1_y = (rect1.height + rect1.top) / 2;
  const rect2_x = (rect2.width + rect2.left) / 2;
  const rect2_y = (rect2.height + rect2.top) / 2;

  const distans = calculateDistance(rect1_x, rect1_y, rect2_x, rect2_y);

  return distans;
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  const distans = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return distans;
}

function checkForHits(button: HTMLElement) {
  const notes = document.querySelectorAll('.note');
  const buttonRect = button.getBoundingClientRect();
  let hitDetected = false;

  notes.forEach((note: any) => {
    const noteRect = note.getBoundingClientRect();
    if (isIntersecting(noteRect, buttonRect) < 10) {
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

const keyDownEvent = (e: KeyboardEvent) => {
  if (e.key === 'd' || e.key === '1') {
    checkForHits(btn1);
  } else if (e.key === 'f' || e.key === '2') {
    checkForHits(btn2);
  } else if (e.key === 'j' || e.key === '3') {
    checkForHits(btn3);
  } else if (e.key === 'k' || e.key === '4') {
    checkForHits(btn4);
  }
};

window.addEventListener('keydown', keyDownEvent);
