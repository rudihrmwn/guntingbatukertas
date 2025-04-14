let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  loss: 0,
  tie: 0
};

function updateScore(){
  document.querySelector('.score').innerHTML = `Menang: ${score.win}, Kalah: ${score.loss}, Seri: ${score.tie}`;
};
updateScore();

function resetScore(){
  score.win = 0;
  score.loss = 0;
  score.tie = 0;
  localStorage.removeItem('score');

  document.querySelector('.result').innerHTML = '';
  document.querySelector('.result2').innerHTML = '';
  updateScore();
}

function pickComputerMove(){
  let computerMove = '';
  let r = Math.random();
  if(r >= 0 && r < 1/3){
    computerMove = 'Gunting';
  } else if(r >= 0 && r < 2/3){
    computerMove = 'Batu';
  } else {
    computerMove = 'Kertas';
  }
  return computerMove;
}

let isAutoPlaying = false;
const autoplayButton = document.querySelector('.autoplay-button');
let intervalId;

function autoplay(){
  if(!isAutoPlaying){
    //intervalId = setInterval(function(){
    intervalId = setInterval(() => {
      player(pickComputerMove());
    },1000);
    isAutoPlaying = true;
    autoplayButton.innerText = 'Stop';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButton.innerText = 'Auto Play';
  }
}

const guntingButton = document.querySelector('.js-gunting-button');
guntingButton.addEventListener('click',()=>{
  player('Gunting');
});

const batuButton = document.querySelector('.js-batu-button');
batuButton.addEventListener('click',()=>{
  player('Batu');
});

const kertasButton = document.querySelector('.js-kertas-button');
kertasButton.addEventListener('click',()=>{
  player('Kertas');
});

document.body.addEventListener('keydown',(value)=>{
  console.log(value.code);
  if(value.code === 'KeyG'){
    player('Gunting');
  } else if(value.code === 'KeyB'){
    player('batu');
  } else if(value.code === 'KeyK'){
    player('kertas');
  }
});


function player(pl){
  let msg1='';
  let msg2='';

  let cm = pickComputerMove();

  msg2 =`You <img class="img-move" src="images/${pl}-emoji.png"> - <img class="img-move" src="images/${cm}-emoji.png"> Computer `;

  if(pl === cm){
    msg1 ='Ties';
    score.tie++;
  } else
  if(
    (pl === 'Gunting' && cm === 'Kertas') || (pl === 'Batu' && cm === 'Gunting') || (pl === 'Kertas' && cm === 'Batu')
  ){
    msg1 ='You Win';
    score.win++;
  } else {
    msg1 ='Computer Win';
    score.loss++;
  }
  localStorage.setItem('score',JSON.stringify(score));

  document.querySelector('.result').innerHTML = msg1;
  document.querySelector('.result2').innerHTML = msg2;
  updateScore();
}