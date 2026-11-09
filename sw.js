const V='autotrack-2026.11.09-6';
const FILES=['./','./index.html','./app.webmanifest','./app-icon-192.png','./app-icon-512.png','./touch-icon-180.png','./favicon.ico','./favicon-32.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));});
