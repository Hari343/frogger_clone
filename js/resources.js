// This is just a simple image loading utility. This makes loading the game objects' images easier.
(function() {
	let resourceCache = {},
		loading = [],
		readyCallbacks = [];

	function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(url => {
                _load(url);
            });
        } 
        else {
            _load(urlOrArr);
        }
	}

    function _load(url) {
        if(resourceCache[url]) {

            return resourceCache[url];
        } 
        else {
            let img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                if(isReady()) {
                    for (let func of readyCallbacks) {
                        func();
                    }
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        let ready = true;
        for(let k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };

})();