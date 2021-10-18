// DECLARING VARIABLES
const musicContainer = document.querySelector('.music-container')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//Song Titles
const songs = [
    '444', 
    'AreYouReadyForLove', 
    'GangstersParadise', 
    'HeatWaves', 
    'InTheHeart', 
    'Lovemark', 
    'Sweat'

]

// INITIALISING STUFF

//Keeping Track of Songs
let songIndex = 0

//Initially Loading Song Information into DOM
loadSong(songs[songIndex])

// FUNCTIONS

//Updating Song Details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.png`
}

//Everything that happen when you press play
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

//Everything that happens when you press pause
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

//Playing Next Song
function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    
    playSong()
}

//Playing Previous Song
function prevSong() {
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

//Updating Progress Bar
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`
}

//Navigating to any part of the progress bar
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}



//EVENT LISTENERS
//Play Song
playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong() 
    }else {
        playSong()
    }
})

//Playing Previous Song
prevBtn.addEventListener('click', prevSong)

//Playing Next Song
nextBtn.addEventListener('click', nextSong)    

//Updating Progress Bar
audio.addEventListener('timeupdate', updateProgress)

//Navigating to any part of the progress bar
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)