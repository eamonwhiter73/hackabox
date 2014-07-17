hackabox
========
Node modules are NOT INCLUDED...you must run "npm install" in the project folder, in the console. After that, you just have to run a MongoDB instance...and type "grunt serve" in the console (project directory). That will load the site automatically into the browser on localhost:9000.

Also, for MongoDB to function - mind this line in lib/config/env/development.js:

...

uri: 'mongodb://localhost/hackabox'

...

You may have to change this depending on how you have MongoDB set up on your computer (I am on a Mac, but I know that for Windows, it might be a slightly different syntax - or you may be using a username and password...just google it).
