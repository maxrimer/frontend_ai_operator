async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');

    await worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });

    console.log('MSW Mocking enabled');
  }
}

initMocks(); 