let play=document.getElementById('play');
let playIcon = play;
let progressbar=document.getElementById('progressbar');
let searchSong = document.getElementById("searchSong");
let audio=new Audio('Audio/1.mp3');
let currentSong=1;

searchSong.addEventListener("keyup", () => {
    let value = searchSong.value.toLowerCase();

    allMusic.forEach((card, index) => {
        let name = songs[index].songName.toLowerCase();

        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

play.addEventListener('click',()=>{
    if(audio.paused||audio.currentTime==0){
        audio.play();
        playIcon.classList.remove('fa-circle-play');
        playIcon.classList.add('fa-circle-pause');
    }
    else{
        audio.pause();
        playIcon.classList.remove('fa-circle-pause');
        playIcon.classList.add('fa-circle-play');
    }
})

audio.addEventListener("timeupdate", () => {
    let progress = (audio.currentTime / audio.duration) * 100;

    progressbar.value = progress;
    progressbar.style.background =
        `linear-gradient(to right,#1db954 ${progress}%,#333 ${progress}%)`;

    currentTime.innerText = formatTime(audio.currentTime);

    if (!isNaN(audio.duration)) {
        duration.innerText = formatTime(audio.duration);
    }
});
progressbar.addEventListener('input',function(){
    let value=this.value;
    this.style.background=`linear-gradient(to right,#1db954 ${value}%,#333 ${value}%)`;
    audio.currentTime=(progressbar.value * audio.duration)/100;

});

let playMusic=Array.from(document.getElementsByClassName('playMusic'));

const makeAllPlay=()=>{
    playMusic.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
playMusic.forEach((elements)=>{
    elements.addEventListener('click',(e)=>{
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        let index=parseInt(e.target.id);
        currentSong=index;
        audio.src=`Audio/${index}.mp3`;
        audio.currentTime=0;
        currentTime.innerText = "0:00";
        audio.play();
        updateNowBar();
    })
})

let allMusic=Array.from(document.getElementsByClassName('music-card'));
let songs=[
    {songName:'Song1',songDes:'this is the description for song 1',songImage:'imagemusic/1pic.webp',songPath:'Audio/1.mp3'},
    {songName:'Song2',songDes:'this is the description for song 2',songImage:'imagemusic/2pic.webp',songPath:'Audio/2.mp3'},
    {songName:'Song3',songDes:'this is the description for song 3',songImage:'imagemusic/3pic.webp',songPath:'Audio/3.mp3'},
    {songName:'Song4',songDes:'this is the description for song 4',songImage:'imagemusic/4pic.webp',songPath:'Audio/4.mp3'},
    {songName:'Song5',songDes:'this is the description for song 5',songImage:'imagemusic/5pic.webp',songPath:'Audio/5.mp3'},
    {songName:'Song6',songDes:'this is the description for song 6',songImage:'imagemusic/6pic.webp',songPath:'Audio/6.mp3'},
    {songName:'Song7',songDes:'this is the description for song 7',songImage:'imagemusic/7pic.webp',songPath:'Audio/7.mp3'},
    {songName:'Song8',songDes:'this is the description for song 8',songImage:'imagemusic/8pic.webp',songPath:'Audio/8.mp3'},
    {songName:'Song9',songDes:'this is the description for song 9',songImage:'imagemusic/9pic.webp',songPath:'Audio/9.mp3'},
    {songName:'Song10',songDes:'this is the description for song 10',songImage:'imagemusic/10pic.webp',songPath:'Audio/10.mp3'},
    {songName:'Song11',songDes:'this is the description for song 11',songImage:'imagemusic/11pic.webp',songPath:'Audio/11.mp3'},
    {songName:'Song12',songDes:'this is the description for song 12',songImage:'imagemusic/12pic.webp',songPath:'Audio/12.mp3'},  
    {songName:'Song13',songDes:'this is the description for song 13',songImage:'imagemusic/13pic.webp',songPath:'Audio/13.mp3'},
    {songName:'Song14',songDes:'this is the description for song 14',songImage:'imagemusic/14pic.webp',songPath:'Audio/14.mp3'},
    {songName:'Song15',songDes:'this is the description for song 15',songImage:'imagemusic/15pic.webp',songPath:'Audio/15.mp3'},
    {songName:'Song16',songDes:'this is the description for song 16',songImage:'imagemusic/16pic.webp',songPath:'Audio/16.mp3'},
    {songName:'Song17',songDes:'this is the description for song 17',songImage:'imagemusic/17pic.webp',songPath:'Audio/17.mp3'},
    {songName:'Song18',songDes:'this is the description for song 18',songImage:'imagemusic/18pic.webp',songPath:'Audio/18.mp3'},
    {songName:'Song19',songDes:'this is the description for song 19',songImage:'imagemusic/19pic.webp',songPath:'Audio/19.mp3'},
    {songName:'Song20',songDes:'this is the description for song 20',songImage:'imagemusic/20pic.webp',songPath:'Audio/20.mp3'},
    {songName:'Song21',songDes:'this is the description for song 21',songImage:'imagemusic/21pic.webp',songPath:'Audio/21.mp3'},
    {songName:'Song22',songDes:'this is the description for song 22',songImage:'imagemusic/22pic.webp',songPath:'Audio/22.mp3'},
    {songName:'Song23',songDes:'this is the description for song 23',songImage:'imagemusic/23pic.webp',songPath:'Audio/23.mp3'},
    {songName:'Song24',songDes:'this is the description for song 24',songImage:'imagemusic/24pic.webp',songPath:'Audio/24.mp3'},   
 
]
let order=[...songs];
allMusic.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].songImage;
    element.getElementsByClassName('image-title')[0].innerText=songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText=songs[i].songDes;
})

let shuffle=document.getElementById('shuffle');
let repeat=document.getElementById('repeat');
let nowBar=document.querySelector('.now-bar');

let songOnRepeat=false;
let songOnShuffle=false;

function shuffleSongs(originalOrder){
    order=[...originalOrder];
    for(let i=order.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [order[i],order[j]]=[order[j],order[i]];
    }
    return order;
}

shuffle.addEventListener('click',()=>{
    if(!songOnShuffle){
        songOnShuffle=true;
        songOnRepeat=false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order=shuffleSongs(songs);
    }
    else{
        songOnShuffle=false;
        shuffle.classList.remove('active');
        order=songs;
        
    }
})

repeat.addEventListener('click',()=>{
    if(!songOnRepeat){
        songOnRepeat=true;
        songOnShuffle=false
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    }
    else{
        songOnRepeat=false;
        repeat.classList.remove('active');
    }
})
playNextSong=()=>{
    if(!songOnRepeat){
        let nextSong=(currentSong+1)%playMusic.length;
        currentSong=nextSong==0?12:nextSong;
        audio.src=order[currentSong-1].songPath;
        audio.currentTime=0;
        currentTime.innerText = "0:00";
        audio.play();
        updateNowBar();
    }
    else{
        audio.src=order[currentSong-1].songPath;
        audio.currentTime=0;
        audio.play();
        currentTime.innerText = "0:00";
        updateNowBar();
    }
}

playPrevSong=()=>{
    let prevSong=(currentSong-1);
    currentSong=prevSong==0?12:prevSong;
    audio.src=`Audio/${currentSong}.mp3`;
    audio.currentTime=0;
    currentTime.innerText = "0:00";
    audio.play();
    updateNowBar();
}

function updateNowBar(){
    nowBar.getElementsByTagName('img')[0].src=order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText=order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText=order[currentSong-1].songDes;

}
forward=document.getElementById('forward');
backward=document.getElementById('backward');

forward.addEventListener('click',()=>{
    playNextSong();
})
audio.addEventListener('ended',()=>{
    playNextSong();
})
backward.addEventListener('click',()=>{
    playPrevSong();
})

let currentTime = document.getElementById("currentTime");
let duration = document.getElementById("duration");
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if (sec < 10) {
        sec = "0" + sec;
    }

    return `${min}:${sec}`;
}

let volume = document.getElementById("volume");

volume.addEventListener("input", () => {
    audio.volume = volume.value / 100;
});

let volumeIcon = document.getElementById("volumeIcon");

volumeIcon.addEventListener("click",()=>{
    if(audio.volume > 0){
        audio.volume = 0;
        volume.value = 0;
        volumeIcon.classList.replace("fa-volume-high","fa-volume-xmark");
    }
    else{
        audio.volume = 0.5;
        volume.value = 50;
        volumeIcon.classList.replace("fa-volume-xmark","fa-volume-high");
    }
});
