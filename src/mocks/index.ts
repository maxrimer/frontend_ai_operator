async function initMocks() {
  // Only initialize MSW if the environment variable is set
  if (import.meta.env.VITE_MSW_ENABLED === 'true' && typeof window !== 'undefined') {
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