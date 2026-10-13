// Auto-unregister any stale service worker registered on localhost from previous projects
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
  self.registration.unregister();
});
