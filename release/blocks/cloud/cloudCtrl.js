define([],function(){function e(e,t){e.forEach(function(e){e.popularity=e[t]})}function t(e,t,n,r){var i=r-n;e.forEach(function(e){e.fontWeight=Math.floor((t-1)*(e.popularity-n)/i),e.modifier=e.sentimentScore>60?"high":e.sentimentScore<40?"low":""})}function n(e){var t=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY;return e.forEach(function(e){e.popularity>=n&&(n=e.popularity),e.popularity<=t&&(t=e.popularity)}),{min:t,max:n}}function r(e){e.sort(function(e,t){return e.popularity>t.popularity?-1:e.popularity<t.popularity?1:0})}function i(i,s){var o=$.extend(!0,[],i||[]);e(o,s);var u=n(o);return t(o,6,u.min,u.max),r(o),o}return{getMinMax:n,assignVisualData:t,sortByPopularity:r,calcPopularity:e,getData:i}});