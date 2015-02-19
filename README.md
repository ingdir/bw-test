# BrandWatch TagCloud

## See it on the web

[Click here](http://rawgit.com/ingdir/bw-test/master/release/index.html) to see the page (this link uses `rawgit.com`).
Use it to see how the latest version built by the author works.

## Run locally

You can configure and run this project locally.

### Configuration

1. Start by installing `node.js` & `npm`, if you don't have them yet.
2. Run `npm install -g gulp` and `npm install -g bower` if you don't have `gulp` and `bower` yet.
3. Run `npm install` to get all local npm dependencies.
4. Run `bower install` to get all local bower dependencies.
5. Run `gulp serve` to run a local server that would listen to [http://localhost:8080](http://localhost:8080) on your machine.

### Running with your own local HTTP server

If you prefer to run your own local server:

1. Run steps 1 through 4 from the **Configuration** above.
2. Run `gulp release` once to compile the assets.
3. Point your HTTP server to the `./release` folder as its root folder.
  
## Tests

Open [http://localhost:8080/tests.html](http://localhost:8080/tests.html) for unit tests, or click the *Run tests* link at the bottom of the app page.


