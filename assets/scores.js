function printHighscores() {
  // get scores if there are any or set an empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
  // sort highscores from highest to lowest
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
  
  highscores.forEach(function(score) {
    // appends list element for every score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;
  
    // display on page
  var olEl = document.getElementById("scores");
  olEl.appendChild(liTag);});
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
  
document.getElementById("clear").onclick = clearHighscores;
  
// run on page load
printHighscores();
