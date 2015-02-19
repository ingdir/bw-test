requirejs.config({
    baseUrl: 'blocks',
    paths: {
        external: '../lib'
    },

    urlArgs: '__=' + (+new Date)
});

requirejs(['main/main']);