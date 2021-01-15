//feature list: 
// + time 
// + graph (bar graph I guess using html data?)
// + 

let currentNumber = -1;
let numberOfPlayers = [];
let allRolls = [];
var largestPercentage = 0;
var numberOfRollOptions = document.getElementsByClassName("rollGraph")[0].childElementCount;



function player(playerName) {
    this.playerName = playerName;
}


function determineFirstPlayer() {
    let firstPlayer = prompt("Who's going first?"); 
    numberOfPlayers.push(firstPlayer);
    let SecondPlayer = prompt("Who's going second?");
    numberOfPlayers.push(SecondPlayer);
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
    document.getElementsByClassName("whoRolled")[0].innerHTML = "<span style=color:red;font-size:45px>" + numberOfPlayers[currentNumber] + "</span> just rolled";
}

function tabulateRolls(lastRoll) {
    allRolls.push(lastRoll); //total from rollDice()
    if (allRolls.length == 1) {
        document.getElementsByClassName("rollingRollCounter")[0].append(lastRoll);
    }
    else {
        document.getElementsByClassName("rollingRollCounter")[0].append(", " + lastRoll);
    }
    document.getElementsByClassName("totalNumberOfRolls")[0].innerHTML = "Total Number of Rolls: " + allRolls.length;
    
    largestPercentage = 0;
    var arrayOfNumbersRolled = [];
    for (var i = 0; i < numberOfRollOptions; i++) {
        if (lastRoll == document.getElementsByClassName("rollGraph")[0].children[i].children[0].innerHTML) {
            document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML++; 
        }
        document.getElementsByClassName("rollGraph")[0].children[i].children[2].innerHTML = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/allRolls.length)*100).toFixed(1) + "%";
        
        arrayOfNumbersRolled.push(document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML);
        console.log(arrayOfNumbersRolled);
        highestPercentageHeightComputer = Math.max(...arrayOfNumbersRolled);  // how this work

    }
    determineBarHeight(highestPercentageHeightComputer);

}

function determineBarHeight(maximumHeight) {
    for (var i = 0; i < numberOfRollOptions; i++) {
        document.getElementsByClassName("actualGraph")[0].children[i].style.height = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/maximumHeight)*100).toFixed(1) + "%";
    } 
}

function appendStuff(dice1, dice2, total) {
    document.getElementsByClassName("changeLater")[0].innerHTML = dice1; 
    document.getElementsByClassName("changeThisToo")[0].innerHTML = dice2; 
    document.getElementsByClassName("total")[0].innerHTML = "Total: " + total;

}
