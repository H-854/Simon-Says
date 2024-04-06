let gameSeq=[];
let userSeq=[];

let started = false;
let level = 0;

let highScore=1;
let btns = ['yellow','red','purple','green'];

let h2 = document.querySelector('h2');

document.addEventListener('keypress', function(){
    if(started==false){
        console.log("Started");
        started=true;

        levelUp();
    }
});

function gameFlash(arg){
    arg.classList.add("flash");
    setTimeout(()=>{
        arg.classList.remove("flash");
    },100);
};

function userFlash(arg){
    arg.classList.add("userFlash");
    setTimeout(()=>{
        arg.classList.remove("userFlash");
    },100);
};

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    gameFlash(randomBtn);
};

function checkingAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
            if(level>highScore){
                highScore=level;
                console.log(highScore);
            }
        }
    }
    else{
        h2.innerHTML = `Game over! Your score was <b>${level-1}</b> <br> Press any key to start. <br> HIGHEST SCORE : ${highScore}`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor = "#121212";
        },100);
        
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkingAns(userSeq.length-1);
};

let allbtns = document.querySelectorAll('.btn');

for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
