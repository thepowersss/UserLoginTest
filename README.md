# UserLoginTest

## To run:

Navigate to ~/reactapp

1. Open a bash/command line here
2. Run 'npm start' without apostrophes (This is the front-end)
3. Open another bash/command line window in the same location
4. Run 'node server.js' (This is the backend)
5. Open localhost:3000 on your favorite web browser and play around!

## Features

  * Users can register an account with a valid email and password
  * Once registered, users can enter their credentials to log in
  * Once Logged-in, user's Dashboard displays the user's Email
  * Users can log out
  * Registration and Login are verified/authenticated through the back end (no overwriting previous accounts with same username)

## Limitations

  * Registration and Login have no client-side indication of success or failure, however the console will say so
  * Users cannot change their passwords or delete their accounts
  * Not much to do once you've logged in...