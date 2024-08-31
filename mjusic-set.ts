document.addEventListener('DOMContentLoaded', function () {
  const songItems = document.querySelectorAll('.song-item');
  const selectedSongElement = document.getElementById('selected-song');
  const audioPlayer = document.getElementById('audio-player');
  const selectButton = document.getElementById('select-button');
  let selectedSong = null;

  songItems.forEach((item) => {
    item.addEventListener('click', function () {
      selectedSong = item.getAttribute('data-song');
      const songTitle = item.getAttribute('data-title');

      selectedSongElement.textContent = songTitle;
      audioPlayer.src = selectedSong;
      selectButton.disabled = false;

      // 他の選択項目から選択状態を解除
      songItems.forEach((song) => song.classList.remove('selected'));
      // 現在の選択項目に選択状態を追加
      item.classList.add('selected');
    });
  });

  selectButton.addEventListener('click', function () {
    if (selectedSong) {
      alert(selectedSong + ' が選択されました！');
    }
  });
});

const senbon = document.getElementById('senbon');
senbon?.addEventListener('click', function () {
  const audio = document.getElementById('myAudio');
  audio?.onplay();
});
