// let playerNumber = prompt("How many players are there?"); 
let currentNumber = -1;
let numberOfPlayers = [];
let allRolls = [];

function player(playerNumber, playerName, playerColor) {
    this.playerNumber = playerNumber;
    this.playerName = playerName;
    this.playerColor = playerColor;
}
let kaori = new player(0, "Kaori", "pink");
let ben   = new player(1, "Ben",   "green");

// numberOfPlayers.push(  ben, kaori );

function determineFirstPlayer() {
    let firstPlayer = prompt("Who's going first?"); 
    if (firstPlayer == "kaori") {
        numberOfPlayers.push(kaori, ben)
    }
    else if (firstPlayer == "ben") {
        numberOfPlayers.push(ben, kaori) 
    } 
    else { 
        determineFirstPlayer();
    }
}
determineFirstPlayer();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function rollDice() {
    let dice1 = getRandomInt(6) + 1;
    let dice2 = getRandomInt(6) + 1;
    let total = dice1 + dice2;
    advancePlayer();
    appendStuff(dice1, dice2, total);
    tabulateRolls(total);
}

function advancePlayer() {
    currentNumber++; 
    if (currentNumber == numberOfPlayers.length) {
        currentNumber = 0;
    } 
    document.getElementsByClassName("whoRolled")[0].innerHTML = "<span style=color:red;font-size:45px>" + numberOfPlayers[currentNumber].playerName + "</span> just rolled";
}

function tabulateRolls(lastRoll) {
    allRolls.push(lastRoll);
    if (allRolls.length == 1) {
        document.getElementsByClassName("rollingRollCounter")[0].append(lastRoll);
    }
    else {
        document.getElementsByClassName("rollingRollCounter")[0].append(", " + lastRoll);
    }
    document.getElementsByClassName("totalNumberOfRolls")[0].innerHTML = "Total Number of Rolls: " + allRolls.length;
    
    var numberOfRollOptions = document.getElementsByClassName("rollGraph")[0].childElementCount;
    console.log(numberOfRollOptions);

    for (var i = 0; i < numberOfRollOptions; i++) {
        if (lastRoll == document.getElementsByClassName("rollGraph")[0].children[i].children[0].innerHTML) {
            document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML++; 
        }
        document.getElementsByClassName("rollGraph")[0].children[i].children[2].innerHTML = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/allRolls.length)*100).toFixed(1) + "%";
        
        /////
        // document.getElementsByClassName("actualGraph")[0].children[i].style.height = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/allRolls.length)*100).toFixed(1) + "%";
        // console.log(document.getElementsByClassName("actualGraph")[0].children[i]);
        ////
        
        // if (lastRoll == document.getElementsByClassName("rollGraph").children[i].firstChild.innerHTML) {
        //     console.log(i + "!!!");
        // }
    }





}

function appendStuff(dice1, dice2, total) {
    document.getElementsByClassName("changeLater")[0].innerHTML = dice1; 
    document.getElementsByClassName("changeThisToo")[0].innerHTML = dice2; 
    document.getElementsByClassName("total")[0].innerHTML = "Total: " + total;

}
