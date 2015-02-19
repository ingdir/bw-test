define(function(require) {
    var cloudCtrl = require('cloud/cloudCtrl'),
        cloudUI = require('cloud/cloudUI'),
        statsUI = require('stats/statsUI');

    var $f = $('#qunit-fixture');
    $.ajax({
        url: '/data/stats.json',
        dataType: 'json'
    })
        .done(test);

    function test(data) {
        var model = null;

        QUnit.test('Test data model', function(assert) {
            model = cloudCtrl.getData(data.topics, 'burst');

            assert.equal(typeof model, 'object', 'Created as Object');

            var model2 = cloudCtrl.getData(model, 'burst');

            assert.equal(typeof model2, 'object', 'Model can be created from a model');
            assert.notStrictEqual(model, model2, 'New model is not the old one');
            assert.equal(model.length, model2.length, 'Model lengths remain equal');
            assert.equal(model[0].label, 'Mixes', 'First word comes up correctly in the 1st model');
            assert.strictEqual(model[0].label, model2[0].label, 'Same for the 2nd');
            assert.deepEqual(cloudCtrl.getMinMax(model), {min: 0, max: 60}, 'Min & max found correctly');
        });

        QUnit.test('Cloud UI', function(assert) {
            var $cloud = $f.find('.b-cloud');
            cloudUI.init($cloud, model);

            assert.equal($f.find('.b-cloud').length, 1, 'Cloud block created');

            cloudUI.init($cloud, model);
            cloudUI.init($cloud, model);
            cloudUI.init($cloud, model);
            cloudUI.init($cloud, model);

            assert.equal($f.find('.b-cloud').length, 1, 'Block can be created many times on the same mode');
            assert.equal($f.find('.b-cloud__word').length, model.length, 'All words are rendered');

            var expectedVal = null;

            $f.on('cloud:displayWordStats', function(e, data) {
                assert.equal(data.label, expectedVal, 'OnClick data is broadcast properly');
            });

            var $w = $f.find('.b-cloud__word').eq(5);
            expectedVal = $w.text();
            $w.click();
        });

        QUnit.test('Stats UI', function(assert) {
            var $stats = $f.find('.b-stats');
            statsUI.init($stats);

            assert.equal($f.find('.b-stats').length, 1, 'Stats block created');

            statsUI.init($stats, model);
            statsUI.init($stats, model);
            statsUI.init($stats, model);
            statsUI.init($stats, model);

            assert.equal($f.find('.b-stats').length, 1, 'Block can be created many times on the same mode');
            assert.equal($f.find('.b-stats').hasClass('b-stats_empty'), true, 'Block content is initially hidden');

            $f.trigger('cloud:displayWordStats', {
                label: 'Test',
                positive: 42,
                negative: 1,
                neutral: 100500
            });

            assert.equal($stats.find('.b-stats__word').text(), 'Test', 'Label is set correctly');
            assert.equal($stats.find('.b-stats__positive').text(), '42', 'Positive is set correctly');
            assert.equal($stats.find('.b-stats__negative').text(), '1', 'Negative is set correctly');
            assert.equal($stats.find('.b-stats__neutral').text(), '100500', 'Neutral is set correctly');
        });
    }
});