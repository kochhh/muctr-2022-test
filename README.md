# muctr-2022-markup

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Build custom modernizr
* Install modernizr from npm: ```npm i modernizr```
* Go to ```./node_modules/modernizr/```, make ```npm i```
* Available options: ```./bin/modernizr```
* Make a build. Example: ```./bin/modernizr --features webp,history --options setClasses --uglify --dest ../../src/js/vendor/modernizr.min.js```

### Build custom Swiper
* Install Swiper as a git submodule: ```git submodule add https://github.com/nolimits4web/swiper``` (from root path)
* Go to folder: ```cd swiper```
* Checkout the latest 8 release: ```git checkout d68a71bea14361010ef201b15359ed6a64c37f4c```
* Make ```npm i```
* Comment out unneeded options in ```swiper/scripts/build-config.js```, save
* Compile bundle ```npm run build:prod```

### Build custom Bootstrap
* Install Bootstrap as a git submodule: ```git submodule add https://github.com/twbs/bootstrap``` (from root path)
* Go to folder: ```cd bootstrap```
* Checkout the latest 5 release: ```git checkout 1a6fdfae6be09b09eaced8f0e442ca6f7680a61e```
* Make ```npm i```
* Comment out unneeded exports in ```bootstrap/js/index.umd.js```, save
* Compile and minify bundle ```npm run js-compile-bundle && npm run js-minify-bundle```
