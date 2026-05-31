declare global {
  interface Window {
    fbq?: any;
  }
}

/**
 * Tracks the "SubmitApplication" event across both browser Meta Pixel and
 * server-side Meta Conversions API (CAPI).
 * 
 * @param value Monetary value associated with the event (e.g. 100, 500)
 * @param currency Currency code (defaults to 'INR')
 */
export async function trackSubmitApplication(value: number = 100, currency: string = 'INR') {
  // 1. Client-Side Browser Pixel tracking
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'SubmitApplication', {
        value: value,
        currency: currency,
      });
      console.log(`[Tracker] Browser Pixel tracked: SubmitApplication with value ${value} ${currency}`);
    } else {
      console.warn('[Tracker] fbq is not initialized on window. Falling back to noscript or only CAPI.');
    }
  } catch (err) {
    console.error('[Tracker] Error triggering browser Pixel:', err);
  }

  // 2. Server-Side Conversions API (CAPI) proxy tracking
  try {
    const response = await fetch('/api/track-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: 'SubmitApplication',
        value: value,
        currency: currency,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('[Tracker] Conversions API (CAPI) tracked successfully:', data);
    } else {
      console.error('[Tracker] Conversions API responded with status:', response.status);
    }
  } catch (err) {
    console.error('[Tracker] Error calling server-side CAPI proxy route:', err);
  }
}
