const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const trackName = document.getElementById("track-name");

const tracks = [
  { name: "Song 1", src: "1.mp3" },
  { name: "Song 2", src: "NOI NAY CO ANH VAVH.mp3" },
  { name: "Song 3", src: "De Anh Luong Thien - Thang Eo Vi || Full Option.mp3" },
  { name: "Song 4", src: "Test.mp3" }
];

let currentTrack = 0;

// Load the first track
function loadTrack(index) {
  audioPlayer.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
}

loadTrack(currentTrack);

// Play/pause functionality
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Next and previous functionality
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

// Media Session API for background control
if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: tracks[currentTrack].name,
    artist: "Unknown Artist",
    album: "Demo Album"
  });

  navigator.mediaSession.setActionHandler("play", () => audioPlayer.play());
  navigator.mediaSession.setActionHandler("pause", () => audioPlayer.pause());
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audioPlayer.play();
  });
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audioPlayer.play();
  });
}
