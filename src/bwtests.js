requirejs.config({
    baseUrl: 'blocks',
    paths: {
        external: '../lib'
    },

    urlArgs: '__=' + (+new Date)
});

requirejs(['tests/tests']);