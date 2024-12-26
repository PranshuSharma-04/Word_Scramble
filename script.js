const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
contentBox = document.querySelector(".container .content");
startArea = document.querySelector(".startArea");
scoreArea = document.querySelector(".score");
modelContent = document.querySelector(".model-content");

var model = document.getElementById("myModel");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var modelText = document.getElementById("modelText");

let correctWord, timer;
let score = 0; 



const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        model.style.display = "block";
        modelContent.classList.add("model-wrong");
        modelText.innerHTML = `<br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word`;
        endGame();
    }, 1000);
}

const start = () => {
    contentBox.style.display = "block";
    startArea.style.display = "none";
initGame(); 
}


const endGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    model.style.display = "block";
    modelContent.classList.remove("model-correct");
    modelContent.classList.add("model-wrong");
    modelText.innerHTML = `
    <center><br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word.
    <br>You Lost The Game ! :(</center><br>
    </center>
    `;

}

const winGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    model.style.display = "block";
    modelContent.classList.add("model-correct");
    modelText.innerHTML = `<br><center>Congrats You WIN THE GAME !!!!!!`;
    
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreArea.innerHTML = score;

    if(score > 9)
    {
        winGame();
    }

}



const checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if(!userWord) { 
        model.style.display = "block";
        modelContent.classList.remove("model-wrong");
        modelContent.classList.remove("model-correct");
        return modelText.innerHTML = `<br>Please enter the word to check!`;
    }

    if(userWord !== correctWord) { 
        if(score >= 1) {
            score = score - 1; 
            scoreArea.innerHTML = score;
        }
        model.style.display = "block";
        modelContent.classList.add("model-wrong");
        return modelText.innerHTML = `<br>Oops! <b>${userWord}</b> is not a correct word`;
    }
    else
    {
    model.style.display = "block";
    modelContent.classList.remove("model-wrong");
    modelContent.classList.add("model-correct");
    modelText.innerHTML = `<br>Congrats! <b>${correctWord.toUpperCase()}</b> is the correct word`;
    score++;
    }
  
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


span.onclick = function() {
    model.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == model) {
      model.style.display = "none";
    }
  }