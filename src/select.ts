document.addEventListener('DOMContentLoaded', function () {
  const senbon = document.getElementById('senbon');
  const syaruru = document.getElementById('syaruru');
  const over = document.getElementById('over');
  const bba = document.getElementById('bba');

  const music1 = new Audio('/music-game/music/senbon.mp3');
  const music2 = new Audio('/music-game/music/syaruru.mp3');
  const music3 = new Audio('/music-game/music/over.mp3');
  const music4 = new Audio('/music-game/music/bisyouzyo.mp3');
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

  //override
  over?.addEventListener('mouseenter', () => {
    music3.currentTime = 1.2;
    music3.play();
  });

  over?.addEventListener('mouseleave', () => {
    music3.pause();
  });
  //びしょぱい
  bba?.addEventListener('mouseenter', () => {
    music4.currentTime = 1.2;
    music4.play();
  });

  bba?.addEventListener('mouseleave', () => {
    music4.pause();
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

  over?.addEventListener('click', () => {
    selectSong('over.mp3');
  });

  bba?.addEventListener('click', () => {
    selectSong('bisyouzyo.mp3');
  });
});
