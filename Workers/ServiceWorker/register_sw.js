window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js', {scope: '/'})
      .then(function(registration) {
        // Success!
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // Error
        console.log('ServiceWorker registration failed: ', err);
      });
  }
});