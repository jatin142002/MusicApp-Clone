console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("/songs/1.mp3");
let masterplay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Let me love you",
    filePath: "/songs/1.mp3",
    coverPath: "/covers/1.jpg",
  },
  {
    songName: "Believer",
    filePath: "/songs/2.mp3",
    coverPath: "/covers/2.jpg",
  },
  {
    songName: "Despacito",
    filePath: "/songs/3.mp3",
    coverPath: "/covers/3.jpg",
  },
  {
    songName: "Astraunat in the ocean",
    filePath: "/songs/4.mp3",
    coverPath: "/covers/4.jpg",
  },
  {
    songName: "Jee le zara",
    filePath: "/songs/5.mp3",
    coverPath: "/covers/5.jpg",
  },
  {
    songName: "Kun faya Kun",
    filePath: "/songs/6.mp3",
    coverPath: "/covers/6.jpg",
  },
  {
    songName: "On my way",
    filePath: "/songs/7.mp3",
    coverPath: "/covers/7.jpg",
  },
  {
    songName: "Meharban",
    filePath: "/songs/8.mp3",
    coverPath: "/covers/8.jpg",
  },
  {
    songName: "Senorita",
    filePath: "/songs/9.mp3",
    coverPath: "/covers/9.jpg",
  },
  {
    songName: "Aa rha hu main",
    filePath: "/songs/10.mp3",
    coverPath: "/covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element , i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause click
masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;

    for (let i = 0; i < 10; i++) {
      if (i == songIndex) {
        document.getElementById(i).classList.remove("fa-play-circle");
        document.getElementById(i).classList.add("fa-pause-circle");
      } else {
        document.getElementById(i).classList.add("fa-play-circle");
        document.getElementById(i).classList.remove("fa-pause-circle");
      }
    }
  } else {
    audioElement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle");
    gif.style.opacity = 0;

    for (let i = 0; i < 10; i++) {
      document.getElementById(i).classList.add("fa-play-circle");
      document.getElementById(i).classList.remove("fa-pause-circle");
    }
  }
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // console.log('timeupdate');

  //Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `/songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove("fa-play-circle");
        masterplay.classList.add("fa-pause-circle");
      } else {
        audioElement.pause();
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-play-circle");
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `/songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");

  for (let i = 0; i < 10; i++) {
    if (i == songIndex) {
      document.getElementById(i).classList.remove("fa-play-circle");
      document.getElementById(i).classList.add("fa-pause-circle");
    } else {
      document.getElementById(i).classList.add("fa-play-circle");
      document.getElementById(i).classList.remove("fa-pause-circle");
    }
  }
});

document.getElementById("previous").addEventListener("click", () => {
  console.log("previous");

  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `/songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");

  for (let i = 0; i < 10; i++) {
    if (i == songIndex) {
      document.getElementById(i).classList.remove("fa-play-circle");
      document.getElementById(i).classList.add("fa-pause-circle");
    } else {
      document.getElementById(i).classList.add("fa-play-circle");
      document.getElementById(i).classList.remove("fa-pause-circle");
    }
  }
});
