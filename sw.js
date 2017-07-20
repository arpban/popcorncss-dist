let CACHE_NAME = 'my-site-cache-v1';
let cacheWhitelist = ['my-site-cache-v1'];
let urlsToCache = [
	'/',
	'/css/main.css',
	'/css/grid.css',
	'/js/main.js',
	'/fonts/font-awesome/css/font-awesome.min.css'
];
self.addEventListener('install',(event)=>{
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache)=>{
				console.log('opened cache: ',CACHE_NAME);
				return cache.addAll(urlsToCache);
			})
	);
});
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch',(event)=>{
	event.respondWith(
		caches.match(event.request)
		.then((response)=>{
			if(response)
				return response;
			// var fetchRequest = event.request.clone();
			// return fetch(fetchRequest).then((response)=>{
			// 	if(!response || response.status !== 200 || response.type !== 'basic'){
			// 		return response;
			// 	}
			// 	var responseToCache = response.clone();
			// 	caches.open(CACHE_NAME)
			// 	.then((cache)=>{
			// 		cache.put(event.request, responseToCache);
			// 	});
			// 	return response
			// });
			return fetch(event.request);
		})
	);
});
