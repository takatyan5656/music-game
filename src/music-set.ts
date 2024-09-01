document.addEventListener('DOMContentLoaded', function () {
  const senbon = document.getElementById('senbon');
  const syaruru = document.getElementById('syaruru');

  const music1 = new Audio('/music-game/music/senbon.mp3');
  const music2 = new Audio('/music-game/music/syaruru.mp3');
  //千本桜
  senbon?.addEventListener('mouseenter', () => {
    music1.currentTime = 1.4;
    music1.play();
  });
  senbon?.addEventListener('mouseleave', () => {
    music1.pause();
  });

  //シャルル
  syaruru?.addEventListener('mouseenter', () => {
    music2.currentTime = 1.2;
    music2.play();
  });

  syaruru?.addEventListener('mouseleave', () => {
    music2.pause();
  });

  function selectSong(songFileName: string) {
    window.location.href = './game.html?song=' + encodeURIComponent(songFileName);
  }

  senbon?.addEventListener('click', () => {
    selectSong('senbon.mp3');
  });

  syaruru?.addEventListener('click', () => {
    selectSong('syaruru.mp3');
  });
});
