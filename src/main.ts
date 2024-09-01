const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

// const music1 = new Audio('/music-game/music/senbon.mp3');
// const music2 = new Audio('/music-game/music/syaruru.mp3');
const music1_bpm = 154;
const music2_bpm = 145;
let bpm = 0;
const noteInterval = 60000 / bpm;

const se = new Audio('/music-game/se/se1.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const countdownElement = document.getElementById('countdown') as HTMLDivElement;
  const startMessageElement = document.getElementById('start-message') as HTMLDivElement;

  function getQueryParam(param: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const selectedSong = getQueryParam('song');

  switch (selectedSong) {
    case 'senbon.mp3':
      bpm = music1_bpm;
      break;
    case 'syaruru.mp3':
      bpm = music2_bpm;
      break;
    default:
      throw new Error('No song selected');
  }

  const music = new Audio('/music-game/music/' + selectedSong);

  let timeLeft = 3;

  const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = String(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownElement.style.display = 'none';
      startMessageElement.style.display = 'block';

      setTimeout(() => {
        startMessageElement.style.display = 'none';
        music.currentTime = 1.0;
        music.play();
        const lane1 = document.getElementById('lane1');
        const lane2 = document.getElementById('lane2');
        const lane3 = document.getElementById('lane3');
        const lane4 = document.getElementById('lane4');
        const ary = [lane1, lane2, lane3, lane4];
        setInterval(() => {
          let num = Math.floor(Math.random() * ary.length);
          createNotes(ary[num]!);
          music.addEventListener('ended', stopGame);
        }, 60000 / bpm);
      }, 1000);
    }
  }, 1000);
});

function stopGame() {
  clearInterval(60000 / bpm);
}

if (!btn1 || !btn2 || !btn3 || !btn4) throw new Error('ボタンの要素が存在しない');

const notesList: {
  lane: number;
  height: number;
}[] = [];

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
    position += 1;
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

function isIntersecting(rect1: DOMRect, rect2: DOMRect) {
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

  se.currentTime = 0;
  se.play();

  notes.forEach((note: any) => {
    const noteRect = note.getBoundingClientRect();
    let judge = isIntersecting(noteRect, buttonRect);

    const containerId = 'images-container' + button.id.replace('btn', '');
    const container = document.getElementById(containerId);
    const img = document.createElement('img');
    img.style.width = '50px';
    img.style.height = '50px';
    img.alt = '当たり判定';

    console.log(judge);

    if (judge < 11) {
      const intervalId = note.dataset.intervalId;
      note.remove();
      clearInterval(Number(intervalId));

      console.log(button.id);

      if (judge <= 2) {
        img.src = '/music-game/images/perfect.png';
      } else if (judge <= 4) {
        img.src = '/music-game/images/great.png';
      } else if (judge <= 7) {
        img.src = '/music-game/images/good.png';
      } else if (judge <= 10) {
        img.src = '/music-game/images/bad.png';
      }

      container?.appendChild(img);
      setTimeout(() => container?.removeChild(img), 500);

      hitDetected = true;
    }
  });
  return hitDetected;
}

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
