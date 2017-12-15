# WDI Project 4: MERN Stack

## Stack

- React
- Node.js
- MongoDB
- Express

#### Tools

- react-bootstrap-autosuggest
- react-spinkit
- font-awesome
- enzyme
- axios
- Twitch API v5

## The App

Twinder is a Tinder-esque stream discovery tool for Twitch streamers. The logged in user receives suggestions of live streamers with matching game, language, maturity rating and follower count. The user can then choose to interact with shown streamer or skip to the next one. Search results can be edited by specifying the game, language and follower range in the user's profile. The goal of the app is to help streamers grow their view base by networking with other similar streamers.

## Challenges

The greatest challenges of this project is navigating through the Twitch API and implementing the filtering mechanism. Some fields such as follower count and game are not set in the user's database as these values need to be fetched from the user's twitch profile dynamically to ensure precision of search. On the other hand, the user is also allowed to specify their own search criteria, making the search process more complicated. Interacted or skipped streamers also need to be stored in the user's profile to prevent them from showing up again. 

## Timeline 
Day 1 - OAuth code and token exchanges.  
Day 2 - Receive streams and filtering backend.  
Day 3 - Streams filtering complete, displaying one result at a time.  
Day 4 - Navbar and tests.  
Day 5 - Implement like and dislike functionalities.  
Day 6 - Allow users to edit profile and amending search accordingly. Styling.  
Day 7 - Styling. Loading spinner. Autosuggest games and language on forms.

## Product
![Homepage](https://imgur.com/xs7tQ1F.png)
![Stream Cards](https://imgur.com/W1WA20s.png)
![User Profile](https://imgur.com/bcVPuPD.png)
![User Edit](https://imgur.com/J8dLNTZ.png)


## Styling 

Overall 8 bit styling to resonate with gamer's nostalgia. 
- Home drawn pixel buttons
- Fonts: 8-bit-wonder, Press Ready, thin-pixel-7
- Background credits [here](https://imgur.com/gallery/VZ9H2)
- Pixel border credits [here](https://codepen.io/albpara/pen/xDBvc?q=8+bit&limit=all&type=type-pens)

## Important

Ensure that you add any relevant environment variables to heroku with `heroku config:set`, eg:

`heroku config:set AWS_BUCKET_NAME=wdi-project-4`
