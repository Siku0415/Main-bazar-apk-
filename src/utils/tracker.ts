declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
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
  const eventName = 'SubmitApplication';
  
  // 1. Client-Side Browser Pixel tracking
  try {
    if (typeof window !== 'undefined') {
      // Ensure fbq function is fallback available or initialized to prevent breaking
      if (!window.fbq) {
        window.fbq = function() {
          (window.fbq.q = window.fbq.q || []).push(arguments);
        };
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
      }
      
      // Standard Facebook Pixel Track (both standard and manual track call to be absolutely thorough)
      window.fbq('track', eventName, {
        value: value,
        currency: currency,
      });
      
      // Also track as a custom event in case Meta dashboards filter standard named SubmitApplication as custom
      window.fbq('trackCustom', eventName, {
        value: value,
        currency: currency,
      });

      console.log(`[Tracker] Browser Pixel tracked event [${eventName}] value: ${value} ${currency}`);
      
      // Dispatch custom DOM event so App UI can show live visual verification toast
      const customEvent = new CustomEvent('meta-pixel-tracked', {
        detail: { eventName, value, currency, method: 'Browser Pixel' }
      });
      window.dispatchEvent(customEvent);
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
        eventName: eventName,
        value: value,
        currency: currency,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('[Tracker] Conversions API (CAPI) tracked successfully:', data);
      
      if (typeof window !== 'undefined') {
        const customEvent = new CustomEvent('meta-capi-tracked', {
          detail: { 
            eventName, 
            value, 
            currency, 
            method: 'Conversions API (CAPI)',
            warning: data.warning,
            simulated: data.simulated
          }
        });
        window.dispatchEvent(customEvent);
      }
    } else {
      console.error('[Tracker] Conversions API responded with status:', response.status);
    }
  } catch (err) {
    console.error('[Tracker] Error calling server-side CAPI proxy route:', err);
  }
}
