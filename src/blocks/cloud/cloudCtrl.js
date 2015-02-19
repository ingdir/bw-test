define(function() {

    /**
     * Calculates popularity score based on volume
     * @param {Array} data
     * @param {String} field used for popularity rating
     */
    function calcPopularity(data, field) {
        data.forEach(function(el) {
            el.popularity = el[ field ];
        });
    }

    /**
     * Specifies properties for visual reendering
     *
     * @param {Object} data to process
     * @param {Number} num of available font sizes
     * @param {Number} min score
     * @param {Number} max score
     *
     * @returns {Object}
     */
    function assignVisualData(data, num, min, max) {
        var spread = max - min;

        data.forEach(function(el) {
            el.fontWeight = Math.floor((num - 1) * (el.popularity - min) / spread);
            el.modifier = el.sentimentScore > 60 ? 'high' : el.sentimentScore < 40 ? 'low' : '';
        });
    }

    /**
     * Finds min and max popularity values
     * @param {Object} data to process
     *
     * @returns {Object} min and max values
     */
    function getMinMax(data) {
        var min = Number.POSITIVE_INFINITY,
            max = Number.NEGATIVE_INFINITY;

        data.forEach(function(el) {
            if (el.popularity >= max) {
                max = el.popularity;
            }

            if (el.popularity <= min) {
                min = el.popularity;
            }
        });

        return {
            min: min,
            max: max
        }
    }

    function sortByPopularity(data) {
        data.sort(function (a, b) {
            if (a.popularity > b.popularity) {
                return -1;
            } else if (a.popularity < b.popularity) {
                return 1;
            } else return 0;
        });
    }

    /**
     * Prepare model-like data for rendering
     *
     * @param {Object} data from the server
     * @param {String} field used for popularity rating
     *
     * @returns {Array}
     */
    function getData(data, field) {
        var topics = $.extend(true, [], data || []);

        calcPopularity(topics, field);

        var stats = getMinMax(topics);
        assignVisualData(topics, 6, stats.min, stats.max);
        sortByPopularity(topics);

        return topics;
    }

    return {
        getMinMax: getMinMax,
        assignVisualData: assignVisualData,
        sortByPopularity: sortByPopularity,
        calcPopularity: calcPopularity,
        getData: getData
    }
});