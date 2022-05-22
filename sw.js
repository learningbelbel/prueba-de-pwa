;
//asignar nover y version de cache
const CACHE_NAME = 'v1_cache_primer_pwa',
urlsToCache = [
    './',
    './src/main.js',
    './img/h.png',
    './img/boy.jpg'
]

//duranta la fase instalacoin, generament se almacena cache, LOS ACTIVOS STATICOS
self.addEventListener('install', e=>{
    e.waitUtil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(()=> self.skipWaiting())
        })
        .catch(err=> console.log('fallo de registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener('activate', e=>{
    const cacheWhilelist = [CACHE_NAME]

    e.waitUtil(
        caches.keys()
        .then(cachesNames =>{
            cachesNames.map(cacheName=>{
               
                //eliminaos lo que ya no se necesita del cache
            if(cacheWhilelist.indexOf(cacheName)===-1){
                return caches.delete(cacheName)
            }
         })  
     })
        //le indca al sw activar el cache actual
        .then(()=>self.clients.claim())
    )
})

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res
            }
            //recuperar de
            return fetch(e.request)
        })
    )
})