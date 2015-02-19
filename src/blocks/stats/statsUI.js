define(function() {
    /**
     * Assign event handlers etc., then starts the rendering process
     *
     * @param {jQuery} $stats jQuery node to attach the component to
     */
    function init($stats) {
        $stats.addClass('b-stats b-stats_empty');

        $(document)
            .off('cloud:displayWordStats')
            .on('cloud:displayWordStats', function(e, data) {
                $stats.removeClass('b-stats_empty');
                
                $stats.find('.b-stats__word').text(data.label);
                $stats.find('.b-stats__positive').text(data.positive || 0);
                $stats.find('.b-stats__negative').text(data.negative || 0);
                $stats.find('.b-stats__neutral').text(data.neutral || 0);

                $stats.find('.b-stats__total').text(
                    ['positive', 'negative', 'neutral'].reduce(function(prev, cur) {
                        return prev += (data[cur] || 0);
                    }, 0)
                );
            });
    }

    return {
        init: init
    }
});