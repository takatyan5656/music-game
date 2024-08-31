let selectedSong: string | null = null;

document.addEventListener('DOMContentLoaded', function () {
  const songItems = document.querySelectorAll('.song-item')!;
  const selectedSongElement = document.getElementById('selected-song') as HTMLAudioElement;
  const audioPlayer = document.getElementById('audio-player')!;
  const selectButton = document.getElementById('select-button') as HTMLButtonElement;

  songItems.forEach((item) => {
    item.addEventListener('click', function () {
      selectedSong = item.getAttribute('data-song');
      const songTitle = item.getAttribute('data-title');

      selectedSongElement!.textContent = songTitle;
      (audioPlayer.firstElementChild as HTMLSourceElement).src = String(selectedSong);
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
