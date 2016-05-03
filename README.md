# AsyncJS - Trick for better speed and compatibility

[![NPM Version](http://img.shields.io/npm/v/olaferlandsen-asyncjs.svg)](https://www.npmjs.com/package/olaferlandsen-asyncjs)
[![NPM Downloads](http://img.shields.io/npm/dm/olaferlandsen-asyncjs.svg)](https://www.npmjs.com/package/olaferlandsen-asyncjs)
[![Node.js Version](http://img.shields.io/node/v/olaferlandsen-asyncjs.svg)](https://www.npmjs.com/package/olaferlandsen-asyncjs)
[![Dependency Status](https://david-dm.org/olaferlandsen/AsyncJS.svg)](https://david-dm.org/olaferlandsen/AsyncJS)
[![devDependency Status](https://david-dm.org/olaferlandsen/AsyncJS/dev-status.svg)](https://david-dm.org/olaferlandsen/AsyncJS#info=devDependencies)
[![Build status](https://codeship.com/projects/c3a705e0-f2e4-0133-42b9-42c612817579/status?branch=master)](https://www.codeship.io/projects/149616)
[![Build status](https://ci.appveyor.com/api/projects/status/r7w1v62wbxpy7apw/branch/master?svg=true)](https://ci.appveyor.com/project/olaferlandsen/asyncjs/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/olaferlandsen/AsyncJS/badge.svg?branch=master)](https://coveralls.io/github/olaferlandsen/AsyncJS?branch=master)
[![Build Status](https://travis-ci.org/olaferlandsen/AsyncJS.png)](https://travis-ci.org/olaferlandsen/AsyncJS)
[![Code Climate](https://codeclimate.com/github/olaferlandsen/AsyncJS/badges/gpa.svg)](https://codeclimate.com/github/olaferlandsen/AsyncJS)
[![Issue Count](https://codeclimate.com/github/olaferlandsen/AsyncJS/badges/issue_count.svg)](https://codeclimate.com/github/olaferlandsen/AsyncJS)
[![Gitter](https://badges.gitter.im/olaferlandsen/AsyncJS.svg)](https://gitter.im/olaferlandsen/AsyncJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Never again will put your javascript in `<head></head>`!

To gain speed when display content on the web page, you need to ideally place all the javascript code at the bottom of the page.

For various reasons (size, processing time, etc.), but today with AsyncJS will make everything more comfortable and will provide the necessary support(**with only 1.22KB size!** and **Gziped 668byte!**).

> First off, call all load file functions[`window.async('file.js', ... )`] and after end it loop, load all anonymous functions[`window.async(function(){...})`].</p>

> If the current protocol is `file://` and you input file has `//`, AsyncJS change it to `http://`</p>

## Intall & Download
### NPM Install
````
npm i olaferlandsen-asyncjs
```
### Download ZIP(unstable)
[Download Unstable](https://github.com/olaferlandsen/AsyncJS/archive/master.zip)

### Download ZIP(Stable)
[Download Stable](https://github.com/olaferlandsen/AsyncJS/releases/latest)

### Git Clone
````
git clone git://github.com/olaferlandsen/AsyncJS.git
```

## API
### Simple load script after load document
```javascript
window.async(string file);
```
Example
```javascript
window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js');
```




### Simple execute script after load document
```javascript
window.async(function success);
```
Example
```javascript
window.async(function(){
    console.log('Hello!');
});
```

### Simple execute script with arguments after load document
```javascript
window.async(function success[, array arguments]);
```
Example
```javascript
window.async(function(name, lastname){
    console.log('Hello '+name+' '+lastname+'!');
}, ['Olaf', 'Erlandsen']);
```

### Advance load script width callback after load document
```javascript
window.async(string file[, function success]);
```
Example
```javascript
window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(){
    console.log('You load jquery '+ $.fn.jquery);
});
```

### Advance load script width success callback and arguments after load document
```javascript
window.async(string file[, function success [, array arguments] ]);
```
Example
```javascript
window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(protocol){
    console.log('You load jquery '+ $.fn.jquery + ' with protocol: ' + protocol);
}, [window.location.protocol]);
```

### Advance load script width success callback, error callback and arguments after load document
```javascript
window.async(string file[, function success [, function error] ]);
```
Example
```javascript
window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(){
    console.log('You load jquery '+ $.fn.jquery  );
}, function () {
    console.error('Error when try load file');
});
```


### Advance load script width success callback, error callback and arguments after load document
```javascript
window.async(string file [, function success [, function error [, array arguments] ] ]);
```
Example
```javascript
window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(protocol){
    console.log('You load jquery '+ $.fn.jquery + ' with protocol: ' + protocol);
}, function () {
    console.error('Error when try load file');
}, [window.location.protocol]);
```
## ONLINE DEMO
[Click here to open online demo](http://htmlpreview.github.io/?https://github.com/olaferlandsen/AsyncJS/blob/master/demo/example.html)

## SIMPLE DEMO #1
> With this example you can put you own jQuery script and execute it only if jQuery file is loaded by AsyncJS(if it possible)

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>AsyncJS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <script src="src/AsyncJS.js"></script>
        <!-- No need put jquery here!! :) -->
    </head>
    <body>
        <script>
            window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(){
                console.log("Now you can use jQuery and don't need load it on <head> any more :)");
            });
        </script>
    </body>
</html>
```

## SIMPLE DEMO #2
> With this example you can put you own jQuery script before load jQuery file
```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>AsyncJS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <script src="src/AsyncJS.js"></script>
    </head>
    <body>
        <script>
            window.async(function(){
                console.log("Now you can use jQuery and don't need load it on <head> any more, because you can use Async before load jQuery :)");
                console.log("You jQuery version is " + $.fn.jquery);
            });
        </script>
        <script src="src/jquery.min.js"></script>
    </body>
</html>
```

## ADVANCE DEMO
> With this example you can put you own script before load another libraries

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>AsyncJS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <script src="src/AsyncJS.js"></script>
    </head>
    <body>
        <ol id="list"></ol>
        <script>
            // Write first item
            var node = document.createElement('li');
            var textnode = document.createTextNode("This is FIRST script, but don't use AsyncJS");
            node.setAttribute('style','color:gray;');
            node.appendChild(textnode); 
            document.getElementById("list").appendChild(node);
            
            
            window.async(function(){
                var node = document.createElement('li');
                var textnode = document.createTextNode("This is the SECOND script and DOES USE AsyncJS.");
                node.setAttribute('style','color:green;');
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
            });
            
            window.async(function(){
                var node = document.createElement('li');
                var textnode = document.createTextNode("This is the THIRD script and DOES USE AsyncJS.");
                node.setAttribute('style','color:green;');
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
            });
            
            window.async('//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js', function(){
                $('#list').append('<li style="color:green;">This is the fourth script, load <em>jQuery('+$.fn.jquery+')</em> and DOES USE AsyncJS</li>');;
            });
            
            window.async('//google.com/not-found', function(){
                $('#list').append('<li>This is the fourth script, load jQuery and DOES USE AsyncJS</li>');;
            }, function () {
                var node = document.createElement('li');
                node.setAttribute('style','color:red;');
                var textnode = document.createTextNode("This is the fifth  script and USE ERROR METHOD");
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
            });
            
            
            // Write second item(because, AsyncJS work after load page), but technically this item  is the last item
            var node = document.createElement('li');
            var textnode = document.createTextNode("This is LAST script, but don't use AsyncJS");
            node.setAttribute('style','color:gray;');
            node.appendChild(textnode); 
            document.getElementById("list").appendChild(node);
        </script>
    </body>
</html>
```


## Browser Support
* Google Chrome 4+ 
  * Android & iOS
* Mozilla Firefox 2+ 
  * Android & iOS
* Microsoft Internet Explorer 5.5+ 
* Microsoft Edge 0.10.10049+ 
  * Desktop, Mobile & Server
* Android Browser 533.1+ 
  * Since Android 2.2
* Safari 3.1+ 
  * Windows & Mac OS
* iOS Safari 3.2+ 
  * iPhone & iPad `[another deviced were not tested]`
* Opera 9.5-9.6+ 
* Opera Mini 5.0+ 
