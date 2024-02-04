player = "X";
computer = "O";

player_score = 0;
computer_score = 0;

board_full = false;
winner_found = false;
play_board = ["", "", "", "", "", "", "", "", ""];

html_board = document.getElementsByClassName("block");
winner_statement = document.getElementById("winner");
html_player_score = document.getElementById("player-score");
html_computer_score = document.getElementById("computer-score");
customerPoints = document.getElementById("current-points");

var CustomerData = JSON.parse(sessionStorage.getItem("customer-data"));

initial_text_player_score = html_player_score.innerText;
initial_text_computer_score = html_computer_score.innerText;
customerPoints.innerText = "Points: " + CustomerData.points;

function render_board(){
  play_board.forEach((element, index) => {
    html_board[index].innerText = play_board[index];
    if (element == player || element == computer) {
      html_board[index].className += " " + "occupied";
    }
  });
}


function check_board_complete(){
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  if (flag == false) {
    board_full = false;
  } else {
    board_full = true;
  }
};

function check_line(a,b,c){
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );
}

function check_match(){
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      html_board[i].classList.add("win");
      html_board[i + 1].classList.add("win");
      html_board[i + 2].classList.add("win");
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      html_board[i].classList.add("win");
      html_board[i + 3].classList.add("win");
      html_board[i + 6].classList.add("win");
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    html_board[0].classList.add("win");
    html_board[4].classList.add("win");
    html_board[8].classList.add("win");
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    html_board[2].classList.add("win");
    html_board[4].classList.add("win");
    html_board[6].classList.add("win");
    return play_board[2];
  }
  return "";
}

function check_for_winner(){
  winner_found = check_match();
  if (winner_found == player) {
    player_score += 1;
    winner.innerText = "Winner is player!!\nYou won 500 points.";
    winner.classList.add("playerWin");
    CustomerData.points += 500;
    sessionStorage.setItem("customer-data", JSON.stringify(CustomerData));
  } else if (winner_found == computer) {
    computer_score += 1;
    winner.innerText = "You lost!\nYou lost 500 points.";
    winner.classList.add("computerWin");
    CustomerData.points -= 500;
    sessionStorage.setItem("customer-data", CustomerData);
  } else if (board_full) {
    winner.innerText = "Draw!\nYou gained 0 points.";
    winner.classList.add("draw");
  }
  html_player_score.innerText = initial_text_player_score + " " + player_score;
  html_computer_score.innerText =
    initial_text_computer_score + " " + computer_score;
}


function addPlayerMove(e){
  if (!winner_found && play_board[e] == "") {
    play_board[e] = player;
    render_board();
    check_board_complete();
    check_for_winner();
    if (!board_full) {
      addComputerMove();
    }
  } else {
}}

function addComputerMove(){
  if (!winner_found) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (play_board[selected] != "");
    play_board[selected] = computer;
    render_board();
    check_for_winner();
  }
}

function reset_board(){
  CustomerData.points -= 250;
  customerPoints.innerText = "Points: " + CustomerData.points;
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner_found = false;
  play_board.forEach((element, index) => {
    html_board[index].classList.remove("occupied");
    html_board[index].classList.remove("win");
  });
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.innerText = "";
  render_board();
}


function reset_match(){
  reset_board();
  UpdatePoints();
  window.location.href = 'index.html';
  player_score = 0;
  computer_score = 0;
  html_player_score.innerText = initial_text_player_score + " " + player_score;
  html_computer_score.innerText =
    initial_text_computer_score + " " + computer_score;
}


function UpdatePoints(){
  var CustomerData = JSON.parse(sessionStorage.getItem("customer-data"));
  var url = "https://electronics-a398.restdb.io/rest/account/" + CustomerData._id;
  const APIKEY = "65ab8ff7384ac111a81414ff";

  let settings = {
      method: "PUT", 
      headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
      },
      body: JSON.stringify(CustomerData)
  };
  fetch(url, settings)
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to update resource");
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}