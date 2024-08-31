document.addEventListener('DOMContentLoaded', function () {
  const songItems = document.querySelectorAll('.song-item');
  const audioPlayer = !document.getElementById('audio-player');

  songItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const songSrc = item.getAttribute('data-song');
      audioPlayer.src = songSrc;
      audioPlayer.play();
    });

    item.addEventListener('mouseleave', function () {
      audioPlayer.pause();
      audioPlayer.currentTime = 0; // 再生位置をリセット
    });
  });
});
