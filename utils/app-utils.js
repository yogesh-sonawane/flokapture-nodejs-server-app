// Please prefere this way of defining the module...
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.appUtils = factory();
    }
}(typeof window !== "undefined" ? window : this, function () {
    function AppFunctions() {
        AppFunctions.prototype.getParameterByName = function (url, parameterName) {
            var name = parameterName.trim();
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(url); // location
            return results === null ?
                '' :
                decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        AppFunctions.prototype.getAllParameters = function (url) {
            var andIndex = url.indexOf('?');
            url = url.substring(andIndex);
            var match,
                pl = /\+/g,
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, ' ').replace('?', ''));
                },
                urlParams = {};
            while ((match = search.exec(url))) {
                urlParams[decode(match[1])] = decode(match[2]);
            }
            return urlParams;
        };

        AppFunctions.prototype.getParams = function (query) {
            if (!query) return {};
            var andIndex = query.indexOf('?');
            query = query.substring(andIndex);
            return (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce(function (params, param) {
                    var [key, value] = param.split('=');
                    params[key] = value ?
                        decodeURIComponent(value.replace(/\+/g, ' ')) :
                        '';
                    return params;
                }, {});
        };

        AppFunctions.prototype.loopResolver = function (item) {
            var i = 0;
            return function (key, value) {
                if (i !== 0 && typeof censor === 'object' && typeof value == 'object' && censor == value)
                    return '[Circular]';
                if (i >= 29) return '[Unknown]';
                ++i;
                return value;
            };
        };

        AppFunctions.prototype.stringify = function (item, censor, space) {
            return JSON.stringify(item, censor ? censor : loopResolver(item), space);
        };
    }
    return new AppFunctions();
}));