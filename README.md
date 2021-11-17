Three Js Node Snowman Multiplayer Game
========================

Snowman game built with three.js and node.

Clone repositry then:

`npm install`

Build the js/css
`npm run build `

To run the game:

`npm start`

Navigate to:

`localhost:8000`

Arrows to move. Spacebar to fire a snowball


## Docker

Build container:
`docker build . -t snowman`

Run container - we mount the data folder so that we can keep scores even if the containter
gets rebuilt/restarted.
`docker run -v $(pwd)/data:/var/www/data -p 8000:8000 --name snowman snowman
