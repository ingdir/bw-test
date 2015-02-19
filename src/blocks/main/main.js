define(function(require) {
    var cloudCtrl = require('cloud/cloudCtrl'),
        cloudUI = require('cloud/cloudUI'),
        statsUI = require('stats/statsUI');

    var getPop = function() { return $('.b-head__pop').val() },
        $cloud = $('.b-cloud'),
        $stats = $('.b-stats'),
        model = null;

    $.ajax({
        url: '/data/stats.json',
        dataType: 'json'
    })
        .then(function(data) {
            model = cloudCtrl.getData(data.topics, getPop());

            cloudUI.init($cloud, model);
            statsUI.init($stats);

            $('.b-head__pop').on('change', function() {
                model = cloudCtrl.getData(model, getPop());
                cloudUI.init($cloud, model);
                statsUI.init($stats);
            });

        }, function() {
            $cloud.text('Error loading data');
        });

});