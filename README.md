# #########################################################################
# Personal Notes - Zilla ##################################################
# #########################################################################

### Starting the game

Download the packages and run:
```
npm install
npm start
```

### Notes

#### ./data/words.js
Basically, we have an API result simulation on ./data/words.js where we have a JSON object containing categories and its nested child words to be guessed on GameStart.

#### ./src/components/*
We have 3 Components created at ./src folder where each one of them is part of a Game Stagging:

- StartScreen
Here we have our Start Screen. No big deal. Just the initial stage of the game that the ./src/App.js calls for first.

- Game
Here is where the magic happens with all variables, hooks, functions to:
    1. Pick a category
    2. Pick a word
    3. Sanitizing the word with lowercase for guessing, avoiding Case Sensitive Characters problems
    4. Engine for counting Correct and Wrong Words with the limit of 3 wrong guesses that leads to  the Game Over

This game stage recieves a massive amount of data through props between the Root App.js and the needed Components itself.

- GameOver
Our final stage of the game after 3 wrong guesses, computing the final score and reseting all the variables for a Game Restart.


### React native hooks used in this project

useState
https://react.dev/reference/react/useEffect

useEffect
https://react.dev/reference/react/useEffect

useCallback
https://react.dev/reference/react/useCallback

useRef
https://react.dev/reference/react/useRef