
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get API credentials from environment variables
    const apiUrl = Deno.env.get("UVDESK_API_URL");
    const apiKey = Deno.env.get("UVDESK_API_KEY");

    // Check if the required environment variables are set
    if (!apiUrl || !apiKey) {
      return new Response(
        JSON.stringify({
          error: "UVDesk configuration is incomplete. Please set all required environment variables."
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Return the UVDesk config
    return new Response(
      JSON.stringify({
        apiUrl,
        apiKey,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
