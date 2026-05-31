import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Fallbacks for Meta Pixel and CAPI
const DEFAULT_CAPI_TOKEN = "EAAfzsG13tWkBRiKJhc26jue4AqXqq6feMwtM5KSsIUjGOX4rZCulnrzB0rNKjBLKvIZBlV6Wyv8WV3EgwOr8NvPQS6Uw4GInOjivxjaMk7cW2ChHchemMJKaw6EdrSkECkI3O7M4sE5tycTsuz3fkIhQdOjsChoPNREvewELwGRIo66GL2hGU8SNaCVAZDZD";
const DEFAULT_PIXEL_ID = "1771954590165539";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy route for Meta Conversions API (CAPI) to prevent token leaking to client-side
  app.post("/api/track-capi", async (req, res) => {
    try {
      const { eventName, value, currency } = req.body;
      
      const capiToken = process.env.META_CAPI_TOKEN || DEFAULT_CAPI_TOKEN;
      const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;

      if (!pixelId || !capiToken) {
        return res.status(400).json({ error: "Meta Pixel configuration missing" });
      }

      // Try to determine client IP address
      let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
      if (Array.isArray(clientIp)) {
        clientIp = clientIp[0];
      }
      if (clientIp.includes(",")) {
        clientIp = clientIp.split(",")[0].trim();
      }
      
      const clientUserAgent = req.headers["user-agent"] || "";

      // Format timestamp in seconds
      const eventTime = Math.floor(Date.now() / 1000);

      // Meta Conversions API payload
      const payload = {
        data: [
          {
            event_name: eventName || "SubmitApplication",
            event_time: eventTime,
            action_source: "website",
            user_data: {
              client_ip_address: clientIp || "127.0.0.1",
              client_user_agent: clientUserAgent
            },
            custom_data: {
              value: Number(value) || 100,
              currency: currency || "INR"
            }
          }
        ]
      };

      console.log(`[CAPI Server] Tracking event ${eventName || "SubmitApplication"} with value ${value} ${currency} using Pixel ${pixelId}`);

      const metaUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${capiToken}`;
      
      const metaResponse = await fetch(metaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const metaResponseData = (await metaResponse.json()) as any;
      console.log("[CAPI Server] Meta API Response:", metaResponseData);

      if (!metaResponse.ok) {
        return res.status(metaResponse.status).json({
          success: false,
          error: metaResponseData.error || "Meta API error"
        });
      }

      return res.json({
        success: true,
        events_received: metaResponseData.events_received,
        fb_trace_id: metaResponseData.fb_trace_id
      });

    } catch (error: any) {
      console.error("[CAPI Server] Error forwarding event to Meta:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
