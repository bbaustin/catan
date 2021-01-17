//feature list: 
// + time 
////////////////// + graph (bar graph I guess using html data?)
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
    let secondPlayer = prompt("Who's going second?");
    numberOfPlayers.push(secondPlayer);
    document.getElementsByClassName("playerRolls")[0].append(firstPlayer + "'s rolls: ");
    document.getElementsByClassName("playerRolls")[1].append(secondPlayer + "'s rolls: ");



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

var whatColor = "red";
// var whatColor = "#58355E";  //optional feature to make seeing people's rolls easier
function advancePlayer() {
    currentNumber++; 
    if (currentNumber == numberOfPlayers.length) {
        currentNumber = 0;
        // whatColor = "#58355E";
    } 
    document.getElementsByClassName("whoRolled")[0].innerHTML = "<span style=color:" + whatColor +  ";font-size:45px>" + numberOfPlayers[currentNumber] + "</span> just rolled";
    whatColor = "red";
}

function tabulateRolls(lastRoll) {
    allRolls.push(lastRoll); //total from rollDice()
    if (allRolls.length < 3) {
        if (allRolls.length % 2 === 1) {
            document.getElementsByClassName("playerRolls")[0].append(lastRoll);
        }
        else {
            document.getElementsByClassName("playerRolls")[1].append(lastRoll); 
        }
        //document.getElementsByClassName("rollingRollCounter")[0].append("<span style='color:'" + whatColor + "'>" + lastRoll + "</span>");
    }
    else {
        if (allRolls.length % 2 === 1) {
            document.getElementsByClassName("playerRolls")[0].append(", " + lastRoll);
        }
        else {
            document.getElementsByClassName("playerRolls")[1].append(", " + lastRoll);

        }
        // document.getElementsByClassName("rollingRollCounter")[0].append(", <span style='color:'" + whatColor + "'>" + lastRoll + "</span>");
    }
    document.getElementsByClassName("totalNumberOfRolls")[0].innerHTML = "Total Number of Rolls: " + allRolls.length;
    
    largestPercentage = 0;
    var arrayOfNumbersRolled = [];
    for (var i = 0; i < numberOfRollOptions; i++) {
        if (lastRoll == document.getElementsByClassName("rollGraph")[0].children[i].children[0].innerHTML) {
            document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML++; 
        }
        arrayOfNumbersRolled.push(document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML);
        console.log(arrayOfNumbersRolled);
        highestPercentageHeightComputer = Math.max(...arrayOfNumbersRolled);  // how this work
        document.getElementsByClassName("rollGraph")[0].children[i].children[2].innerHTML = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/allRolls.length)*100).toFixed(1) + "%";
    }
    determineBarHeight(highestPercentageHeightComputer);

}

function determineBarHeight(maximumHeight) {
    for (var i = 0; i < numberOfRollOptions; i++) {
        console.log(document.getElementsByClassName("actualGraph")[0].children[i]);
        document.getElementsByClassName("actualGraph")[0].children[i].style.height = ((document.getElementsByClassName("rollGraph")[0].children[i].children[1].innerHTML/maximumHeight)*100).toFixed(1) + "%";
    } 
}

function appendStuff(dice1, dice2, total) {
    document.getElementsByClassName("diceSquare")[0].innerHTML = dice1; 
    document.getElementsByClassName("diceSquare")[1].innerHTML = dice2; 
    document.getElementsByClassName("total")[0].innerHTML = "Total: " + total;

}
