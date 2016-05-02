/*!
 * AsyncJS JavaScript Trick
 * https://github.com/olaferlandsen/AsyncJS
 *
 *
 * Copyright Olaf Erlandsen and other contributors
 * Released under the MIT license
 * https://github.com/olaferlandsen/AsyncJS/blob/master/LICENSE
 *
 * Date: 2016-05-01T05:00Z
 */
window.async = function () {
    var type,
        file,
        options = {},
        index = 0,
        _isFunction = function (o) {return !!(o && o.constructor && o.call && o.apply)},
        _isArray    = function(a){return (Object.prototype.toString.call(a) === '[object Array]')},
        _propertyExists = function(o,p) {return o.hasOwnProperty(p)};
    // create store object
    if (window._async === undefined || !_propertyExists(window,'_async')) {
        window._async = {
            'file':[],
            'func':[]
        };
    }
    // if you call 'window.async( void )' this return false
    if (arguments.length == 0) return false;
    if (typeof arguments[0] == 'string') {
        type = 'file';
        options.file = arguments[index];
        if (options.file.indexOf('//') == 0 && window.location.protocol.indexOf('file') == 0) {
            options.file = 'http:' + options.file;
        }
        index++;
        if (_isFunction(arguments[index])) {
            options.success = arguments[index];
            index++;
        }
        if (_isFunction(arguments[index])) {
            options.error = arguments[index];
            index++;
        }
    } else if (_isFunction(arguments[index])) {
        type = 'func';
        options.success = arguments[index];
        index++;
        if (_isFunction(arguments[index])) {
            options.error = arguments[index];
            index++;
        }
    }
    if (_isArray(arguments[index]) && _propertyExists(options,'success')) {
        options.arguments = arguments[index];
    } else {
        options.arguments = [];
    }
    if (type == 'file') {
        window._async.file.push(options)
    } else {
        window._async.func.push(options);
    }
    // this script execute on load page, so if you use 'window.async(...)' on you page, this script call you own scripts
    window.onload = function () {
        window._async.file.map(function (element) {
            var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
            xhr.open('HEAD', element.file, false);
            try {
                xhr.send();
                if(xhr.status == 404){
                    if (_propertyExists(element,'error')) return element.error.apply(element.error, element.arguments);
                    return;
                }
            } catch (e) {
                if (_propertyExists(element,'error')) return element.error.apply(element.error, element.arguments);
            }
            var script = document.createElement('script');
            script.src= element.file;
            if (_propertyExists(element,'success')) {
                script.onload = script.onreadystatechange = function() {
                    var state = this.readyState,
                        status = true;
                    if (state) {
                        if (state != 'complete' && state != 'loaded') {
                            if (_propertyExists(element,'error'))return;
                            return element.error.apply(element.error, element.arguments);
                        }
                    }
                    return element.success.apply(element.success, element.arguments);
                };
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        })
        window._async.func.map(function (element) {
            return element.success.apply(element.success, element.arguments);
        })
    }
};