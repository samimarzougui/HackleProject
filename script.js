let words = [
    "Array", 
    "Shell",
    "Abort",
    "Addin",
    "Addon",
    "Algol",
    "Apple",
    "Ascii",
    "Basic",
    "Block",
    "Cache",
    "Click",
    "Close",
    "Cobol",
    "Coral",
    "Crash",
    "Debug",
    "Email",
    "Erase",
    "Excel",
    "Field",
    "Flash",
    "Forth",
    "Forum",
    "Frame",
    "Gates",
    "Image",
    "Input",
    "Intel",
    "Laser",
    "Layer",
    "Logic",
    "Login",
    "Logon",
    "Macro",
    "Media",
    "Micro",
    "Modem",
    "Morph",
    "Mouse",
    "MSDos",
    "Octal",
    "Paint",
    "Panel",
    "Patch",
    "Pixel",
    "Popup",
    "Proxy",
    "Purge",
    "Query",
    "Queue",
    "Reset",
    "Robot",
    "Spool",
    "Stack",
    "Stats",
    "Suite",
    "Track",
    "Virus",
    "Write",
    "Linux",
    "MacOS",
    "Hacks",
    "coder",
    "adder",
    "fetch",
    "string",
    "float",
    "chars",
    "const",
    "switch",
    "cases",
    "break",
    "while",
    "return",
    "links",
    "point",
    "clone",
    "funct",
    "flags",
    "local",
    "alien",
    "exist",
    "stdin",
    "files",
    "bytes",
    "email",
    "phone",
    "short",
    "posix",
    "class",
    "lists",
    "event",
    "field",
    "loops",
    "graph",
    "heaps",
    "input",
    "error",
    "nodes",
    "param",
    "radix",
    "crack"
];

let board = new Array(6); // 5x6 array filled with 0
for (let i = 0; i < 6; i++) {
    board[i] = new Array(5);
    for (let j = 0; j < 5; j++) {
        board[i][j] = ".";
    }
}


document.addEventListener('DOMContentLoaded', init);

let x = 0;
let y = 0;

let theAnswer = null;
function init() {
    theAnswer = pickAWord();
    document.addEventListener('keydown', keyTypedHandler);
    let keyboard = document.getElementById("keyboard");
    let keys = keyboard.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
        keys[i].addEventListener('click', keyClickedHandler);
    }
    let hackButton = document.getElementById("hack-button");
    hackButton.addEventListener('click', clickedHackButton);
}

function pickAWord() {
    let random = Math.floor(Math.random() * words.length);
    return words[random].toLowerCase();
}

function typeKeyGuess(key) {

    if (x == board[0].length) {
        return;
    }
    board[y][x] = key;
    console.log(key);
    console.log(y + 1);
    let row = document.getElementById("row" + (y + 1));
    let cell = row.getElementsByClassName("tile")[x];
    cell.innerHTML = key;
    x++;
}

function keyClickedHandler(e) {
    e.target.blur();
    let key = e.target.innerHTML;
    console.log(key);
    key = key.toLowerCase();
    if (key == "enter") {
        handleEnter();
        return;
    }
    if (key == "backspace") {
        handleBackspace();
        return;
    }

    typeKeyGuess(key);
}
function keyTypedHandler(e) {
    console.log(e.keyCode);
    let key = e.key;
    key = key.toLowerCase();

    if (e.keyCode == 13) {
        handleEnter();
        return;
    }

    if (e.keyCode == 8) {
        handleBackspace();
        return;
    }

    if (e.keyCode > 64 && e.keyCode < 91) {
        typeKeyGuess(key);
    }
}

function handleEnter() {
    let winner = false;
    if (x != board[0].length) {
        return;
    }
    let theGuess = "";
    for (let i = 0; i < 5; i++) {
        theGuess += board[y][i];
    }
    console.log(theGuess);
    if (theGuess === theAnswer) {
        goodGuess();
        notifyWinner();
        winner = true;
    }
    else {
        let tempAnswer = theAnswer.split('');
        for (let i = 0; i < theAnswer.length; i++) {
            if (tempAnswer[i] == theGuess.charAt(i)) {
                let row = document.getElementById("row" + (y + 1));
                let cell = row.getElementsByClassName("tile")[i];
                cell.style.backgroundColor = "green";
                tempAnswer[i] = ".";
                let button = document.getElementById("key-" + theGuess.charAt(i));
                button.style.backgroundColor = "green";
            }
            else if (tempAnswer.join("").includes(theGuess.charAt(i))) {
                let row = document.getElementById("row" + (y + 1));
                let cell = row.getElementsByClassName("tile")[i];
                cell.style.backgroundColor = "orange";

                let button = document.getElementById("key-" + theGuess.charAt(i));
                if (button.style.backgroundColor != "green") {
                    button.style.backgroundColor = "orange";
                }
            }
            else {
                let row = document.getElementById("row" + (y + 1));
                let cell = row.getElementsByClassName("tile")[i];
                cell.style.backgroundColor = "darkred";
                let button = document.getElementById("key-" + theGuess.charAt(i));
                if (button.style.backgroundColor != "green" && 
                    button.style.backgroundColor != "orange") {
                    button.style.backgroundColor = "darkred";
                }
            }
        }
    }

    if (((y + 1) == board.length) || winner) {
        if (!winner) {
            alert("Bummer, you lost! The answer was " + theAnswer.toUpperCase());
        }

        let keys = keyboard.getElementsByClassName("key");
        for (let i = 0; i < keys.length; i++) {
            keys[i].setAttribute("disabled", "");
        }

        document.removeEventListener('keydown', keyTypedHandler);

        return;
    }
    y++;
    x = 0;

}


function goodGuess() {
    console.log("HELLOOOO");
    for (let i = 0; i < board[0].length; i++) {
        let row = document.getElementById("row" + (y + 1));
        let cell = row.getElementsByClassName("tile")[i];
        cell.style.backgroundColor = "green";
        let button = document.getElementById("key-" + board[y][i]);
        button.style.backgroundColor = "green";
    }
    // let keys = keyboard.getElementsByClassName("key");
    // for (let i = 0; i < keys.length; i++) {
    //     keys[i].setAttribute("disabled", "");
    // }
}

function notifyWinner() {
    alert("You win, fellow nerd!");
}

function handleBackspace() {
    console.log("dude");
    if (x == 0) {
        return;
    }
    x--;
    board[y][x] = ".";
    let row = document.getElementById("row" + (y + 1));
    let cell = row.getElementsByClassName("tile")[x];
    cell.innerText = "";
}
let clickedHack = false;
function clickedHackButton(e) {
    e.target.blur();

    if (y == 0) {
        alert("You can't hack the first row!");
        return;
    }
    if (clickedHack) {
        alert("Your hack was blocked!");
        return;
    }
    clickedHack = true;

    let currRow = document.getElementById("row" + (y + 1));
    while (x >= 0) {
        let cell = currRow.getElementsByClassName("tile")[x];
        cell.innerText = "";
        x--;
    }

    let prevRow = document.getElementById("row" + (y));
    for (let i = 0; i < board[0].length; i++) {
        let cell = prevRow.getElementsByClassName("tile")[i];
        cell.innerText = "";
        cell.style.backgroundColor = "black";
    }


    alert("You hacked the row! Security has been enabled, no more hacks for you!");
    x = 0;
    y--;
}