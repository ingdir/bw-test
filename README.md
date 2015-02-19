# BrandWatch TagCloud

## See it on the web, now

[Click here](http://rawgit.com/ingdir/bw-test/master/release/index.html) to see the app (this link uses `rawgit.com`).
Use it to open the latest release version from this repo.

## Run with your own local HTTP server

If you prefer running your own local server and/or don't want to run the build or make changes, point your local
HTTP server to the `release` folder of this repo as its root, and open `index.html`.

## Build the project from scratch

1. Start by installing `node.js` & `npm`, if you don't have them yet.
2. Run `npm install -g gulp` and `npm install -g bower` if you don't have `gulp` and `bower` tools.
3. Run `npm install` to fetch npm dependencies.
4. Run `bower install` to fetch bower dependencies.
5. Run `gulp serve` to run a local server that would listen to [http://localhost:8080](http://localhost:8080) on your machine.

## Develop locally

After you go through the build steps above and run `gulp serve`, a watcher starts listening to file changes
and rebuilds frontend assets each time you modify files in the `src` folder.

## Run tests

Open [http://localhost:8080/tests.html](http://localhost:8080/tests.html) for unit tests,
or open the app and click the *Run tests* link at the bottom of the page.


