## Hang-Man Pseudocode

##Procedural
  - Create basic layout via HTML
  - Create styling via CSS
  - Create button entitled "New Game" to display hang stick and generate random phrase and display _ for letters
  - Allow user input of alphabet letters from click
  - if letter is in word, display it
  - if not, mark the hang stick with a body part
  - Continue until lose condiotions are met or win conditions are met
  - If lose, display "You did not win this round. Try again!"
  - if Win. display "You won! Click New Game to play agaon"!
  - After either win or Loss, dispaly original word

## Questions
  - How do I create a lsit of words?
  - How do I prevent duplicate guesses?

## State
  - need Variables to track, number of plays made, number of incorrect guesses, number of letters remaining, state of current word (complete or not)

## Functional
  - need function for Begin Game
    * Will dispaly new game board, new stack of _ for letters, picks random word, and clears/resets any guesses or hand stick items
        
