/// feature list:
//////////////////
// + timer
// + seven notator
// + in general, option for more stats per player. not sure how many are necessary
// + (x) number of players (up to 6?)
// + different dice
// + database/data running over all games played
// + clean up code--
//    - split large function (tabulate) into smaller ones
//    - give useful variable names to long DOM things

/// finished tasks
//////////////////
// + bar graph
// + Fix the alignment of the bar graph
// Separate divs for individual player rolls.

// 6/24 TODO:
// Error-check the prompts
// - More stats per player? (circle graph)  not sure how many are necessary
// Mobile view
// - Vertical bar graph (easy with flex? I think)
// - Not easy! Maybe use HTML -data instead of JS height

let currentNumber = -1
let numberOfPlayers = 0
let players = []
let allRolls = []
let largestPercentage = 0
let numberOfRollOptions =
  document.getElementsByClassName('rollGraph')[0].childElementCount

function player(playerName) {
  this.playerName = playerName
}

function determineNumberOfPlayers() {
  numberOfPlayers = prompt('How many are playing? (enter a number)') //TODO: Not prompt? Maybe different thing. Don't want cancel
  numberOfPlayers = parseInt(numberOfPlayers, 10)
  if (typeof numberOfPlayers !== 'number') {
    determineNumberOfPlayers() // TODO: Make this work. RegEx?
  } else {
    determinePlayerNames(numberOfPlayers)
  }
}

function determinePlayerNames(numberOfPlayers) {
  for (let i = 1; i < numberOfPlayers + 1; i++) {
    let tempPlayer = prompt(`Enter Player ${i}'s name`)
    if (!tempPlayer) {
      tempPlayer = `Player ${i}`
    }
    players.push(tempPlayer)
    let newPlayerRollDiv = document.createElement('div')
    let newPlayerRollContent = document.createTextNode(
      `${tempPlayer}'s rolls: `
    )
    newPlayerRollDiv.appendChild(newPlayerRollContent)
    document
      .getElementsByClassName('playerRolls')[0]
      .appendChild(newPlayerRollDiv)
  }
}
determineNumberOfPlayers()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function rollDice() {
  let dice1 = getRandomInt(6) + 1
  let dice2 = getRandomInt(6) + 1
  let total = dice1 + dice2
  advancePlayer(total)
  appendDiceAndTotal(dice1, dice2, total)
}

let whatColor = 'red' // TODO: Optional feature: Add custom colors per player
function advancePlayer(total) {
  currentNumber++
  if (currentNumber == players.length) {
    currentNumber = 0
  }
  document.getElementsByClassName('whoRolled')[0].innerHTML =
    '<span style=color:' +
    whatColor +
    ';font-size:45px>' +
    players[currentNumber] +
    '</span> just rolled'
  whatColor = 'red'
  tabulateRolls(total, currentNumber)
}

function tabulateRolls(total, currentNumber) {
  allRolls.push(total) //total from rollDice()
  if (allRolls.length <= numberOfPlayers) {
    document
      .getElementsByClassName('playerRolls')[0]
      .children[currentNumber].append(`${total}`)
  } else {
    document
      .getElementsByClassName('playerRolls')[0]
      .children[currentNumber].append(`, ${total}`)
  }

  document.getElementsByClassName('totalNumberOfRolls')[0].innerHTML =
    'Total Number of Rolls: ' + allRolls.length

  //TODO: Move this into another function, probably
  largestPercentage = 0
  let arrayOfNumbersRolled = []
  for (let i = 0; i < numberOfRollOptions; i++) {
    if (
      total ==
      document.getElementsByClassName('rollGraph')[0].children[i].children[0]
        .innerHTML
    ) {
      document.getElementsByClassName('rollGraph')[0].children[i].children[1]
        .innerHTML++
    }
    arrayOfNumbersRolled.push(
      document.getElementsByClassName('rollGraph')[0].children[i].children[1]
        .innerHTML
    )
    highestPercentageHeightComputer = Math.max(...arrayOfNumbersRolled) // how this works: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    document.getElementsByClassName('rollGraph')[0].children[
      i
    ].children[2].innerHTML =
      (
        (document.getElementsByClassName('rollGraph')[0].children[i].children[1]
          .innerHTML /
          allRolls.length) *
        100
      ).toFixed(1) + '%'
  }
  determineBarHeight(highestPercentageHeightComputer)
}

function determineBarHeight(maximumHeight) {
  for (let i = 0; i < numberOfRollOptions; i++) {
    document.getElementsByClassName('actualGraph')[0].children[i].style.height =
      (
        (document.getElementsByClassName('rollGraph')[0].children[i].children[1]
          .innerHTML /
          maximumHeight) *
        100
      ).toFixed(1) + '%'
  }
}

// function colorSevensRed(total, who) {
//   let firstPlayerRolls = document.getElementsByClassName('playerRolls')[0]
//   let secondPlayerRolls = document.getElementsByClassName('playerRolls')[1]

//   if (total == 7) {
//     if (who % 2 === 1) {
//       console.log('one player, figure out which one')
//     } else {
//       console.log('another plyer')
//     }
//   }
// }

function appendDiceAndTotal(dice1, dice2, total) {
  document.getElementsByClassName('diceSquare')[0].innerHTML = dice1
  document.getElementsByClassName('diceSquare')[1].innerHTML = dice2
  document.getElementsByClassName('total')[0].innerHTML = 'Total: ' + total
}
