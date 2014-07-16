hackabox
========
Node modules are included...you just have to run MongoDB instance...and then cd to the site directory in your console...and type grunt serve. That will load the site automatically into the browser on localhost:9000.

Also, for MongoDB to function - mind this line in lib/config/env/development.js:

...

uri: 'mongodb://localhost/hackabox'

...

You may have to change this depending on how you have MongoDB set up on your computer (I am on a Mac, but I know that for Windows, it might be a slightly different syntax - or you may be using a username and password...just google it).
