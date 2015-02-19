define(function(require) {
    var JSPath = require('external/jspath');

    /**
     * A factory that returns a function.
     * Each time that function is called, it returns
     * one of the two method names, in turns,
     * and always remembers its state.
     *
     * @param {Number} f initial value, 1 or -1
     * @param {String} a method 1
     * @param {String} b method 2
     *
     * @returns {Function}
     */
    function addFnFactory(f, a, b) {
        return function() {
            f = -f;
            return f < 0 ? a : b;
        };
    }

    /**
     * Assign event handlers etc., then starts the rendering process
     *
     * @param {jQuery} $cloud jQuery node to attach the component to
     * @param {Array} data
     */
    function init($cloud, data) {
        if (data.length === 0) return true;

        // we have to assign handlers etc.,
        // also remove the old ones
        var debounceTimeoutId = 0;
        $(window)
            .off('resize.bwTagCloud')
            .on('resize.bwTagCloud', function() {
                clearTimeout(debounceTimeoutId);
                debounceTimeoutId = setTimeout(function() {
                    render($cloud, data);
                }, 150);
            });

        $cloud
            .off('click.bwTagCloud')
            .on('click.bwTagCloud', '.b-cloud__word', function() {
                var item = JSPath('^ {.id === $id}', data, {id: this.getAttribute('data-id')});
                if (! item || ! item[0]) return true;

                $cloud.trigger('cloud:displayWordStats', {
                    label: item[0].label,

                    positive: item[0].sentiment.positive || 0,
                    negative: item[0].sentiment.negative || 0,
                    neutral: item[0].sentiment.neutral || 0
                });
            });

        render($cloud, data);
    }

    /**
     * Renders tag cloud based on the data model
     *
     * @param {jQuery} $cloud jQuery node to attach the component to
     * @param {Array} data
     */
    function render($cloud, data) {
        $cloud
            .addClass('b-cloud')
            .empty()
            .find('.b-stats')
            .addClass('b-stats_empty');

        var width = $cloud.outerWidth(),
            addFnRows = addFnFactory(1, 'appendTo', 'prependTo'),
            $getRow = function() {
                return $('<div></div>')
                    .data('add', addFnFactory(1, 'appendTo', 'prependTo'))
                    .addClass('b-cloud__row')[ addFnRows() ]($cloud);
            },
            $getWord = function(t) {
                return $('<div></div>')
                    .addClass('b-cloud__word ' + (t.modifier !== '' ? 'b-cloud__word_' + t.modifier : ''))
                    .text(t.label)
                    .attr({
                        title: t.popularity,
                        'data-id': t.id
                    })
                    .css({fontSize: (100 + 60 * t.fontWeight) + '%'});
            },
            wordFits = function($w, $row) {
                var $wClone = $w.clone(true);
                $wClone[ $row.data('add')() ]($row);
                $row.data('add')();  // keep insertion side the same!

                var w = $row.outerWidth();
                $wClone.remove();

                return w <= width;
            },
            $currentRow = $getRow(),
            $prevRow = $currentRow;

        data
            .forEach(function(t) {
                // generate word token
                var $w = $getWord(t);

                // see if it fits the current row
                if (! wordFits($w, $currentRow)) {
                    // try to move some of the short words from the current row
                    // to the previous one
                    if (false && $currentRow !== $prevRow) {
                        var words = $currentRow.find('.b-cloud__word').get().map(function(el) {
                            return $(el);
                        });

                        words.sort(function($a, $b) {
                            if ($a.data('outerWidth') > $b.data('outerWidth')) {
                                return -1;
                            } else if ($a.data('outerWidth') < $b.data('outerWidth')) {
                                return 1;
                            } else return 0;
                        });

                        while (words.length > 0 && wordFits(words[words.length - 1], $prevRow)) {
                            words[words.length - 1][ $prevRow.data('add')() ]($prevRow);
                            words.pop();
                        }
                    }

                    if (! wordFits($w, $currentRow) && $currentRow.find('.b-cloud__word').length > 0) {
                        // time to start a new row...
                        $prevRow = $currentRow;
                        $currentRow = $getRow();
                    }
                }

                // append it to the current row
                $w[ $currentRow.data('add')() ]($currentRow);
                // save outerWidth in the data cache
                $w.data('outerWidth', $w.outerWidth());
            });
    }

    return {
        init: init
    }
});