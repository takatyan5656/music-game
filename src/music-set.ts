document.addEventListener('DOMContentLoaded', function () {
  const senbon = document.getElementById('senbon');
  const syaruru = document.getElementById('syaruru');

  const music1 = new Audio('/music-game/music/senbon.mp3');
  const music2 = new Audio('/music-game/music/syaruru.mp3');

  senbon?.addEventListener('mouseenter', () => {
    music1.currentTime = 1.4;
    music1.play();
  });

  senbon?.addEventListener('mouseleave', () => {
    music1.pause();
  });
  syaruru?.addEventListener('mouseenter', () => {
    music2.currentTime = 1.2;
    music2.play();
  });

  syaruru?.addEventListener('mouseleave', () => {
    music2.pause();
  });

  document.querySelectorAll('.start-btn').forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = './game.html';
    });
  });
});
