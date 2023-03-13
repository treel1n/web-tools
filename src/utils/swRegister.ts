export default function() {
  if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
      // Try to register the service worker.
      try {
        const reg = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });
        console.info('Service worker registered! 😎', reg);
      } catch (err) {
        console.error('😥 Service worker registration failed: ', err);
      }
    });
  }
}