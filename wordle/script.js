const wordSelector = () => {
    const index = Math.floor(Math.random() * window.words.length);
    return window.words[index];
};

const targetWord = wordSelector();

const input = document.querySelector("#guessInput");
const submit = document.querySelector("#submit"); 

let row = 0;
let gameFinished = false;

const boxes = document.querySelectorAll(".square");

const feedback = document.querySelector("#feedback");


const submitGuess = () =>{
    if (gameFinished) return;

    const word = input.value.trim().toLowerCase();
    if(word.length !== 5){
        return;
    }
    for(let i =0; i<5;i++){
        boxes[5*row + i].textContent = word[i];
        if(word[i] === targetWord[i]){
            boxes[5*row + i].style.backgroundColor = "green";
            boxes[5*row + i].style.color = "white";
        }
        else if(targetWord.includes(word[i])){
            boxes[5*row + i].style.backgroundColor = "yellow";
            boxes[5*row + i].style.color = "black";
        }
        else{
            boxes[5*row + i].style.backgroundColor = "gray";
            boxes[5*row + i].style.color = "white";
        }
    }
    row++;
    if(word === targetWord){
        feedback.textContent = "Congratulations! You guessed the word!";
        gameFinished = true;
        input.value = "";
        return;
    } else if(row === 6){
        feedback.textContent = "Game over, the word was " + targetWord;
        gameFinished = true;
        input.value = "";
        return;
    }
    input.value = "";
}

submit.addEventListener("click", submitGuess);
