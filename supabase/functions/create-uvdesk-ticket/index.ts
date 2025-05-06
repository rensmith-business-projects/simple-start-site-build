
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
      console.error("UVDesk configuration is incomplete");
      return new Response(
        JSON.stringify({
          error: "UVDesk configuration is incomplete. Please set all required environment variables.",
          fallback: true
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the request body to get ticket data
    const ticketData = await req.json();
    console.log("Received ticket creation request:", ticketData);

    // Validate required ticket fields
    const requiredFields = ["name", "from", "subject", "message"];
    for (const field of requiredFields) {
      if (!ticketData[field]) {
        console.error(`Missing required field: ${field}`);
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Set default values for optional fields if not provided
    const ticket = {
      type: ticketData.type || "request",
      priority: ticketData.priority || "normal",
      ...ticketData
    };

    console.log(`Submitting ticket to UVDesk API at: ${apiUrl}`);
    
    // Make the request to UVDesk API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(ticket),
    });
    
    console.log("UVDesk API response status:", response.status);
    
    // Handle non-success responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error("UVDesk error response:", errorText);
      
      // Check if this is the trial plan API access error
      if (errorText.includes("disabled for trial plans")) {
        return new Response(
          JSON.stringify({ 
            error: "UVDesk API access is not available on your trial plan",
            details: "Support for APIs has been disabled for trial plans. Please contact UVDesk support to enable this feature.",
            fallback: true
          }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to create ticket in UVDesk",
          status: response.status,
          details: errorText,
          fallback: true
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    // Parse and return the successful response
    const responseData = await response.json();
    console.log("UVDesk ticket created successfully:", responseData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Ticket created successfully",
        data: responseData
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in create-uvdesk-ticket function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process ticket creation",
        details: error.message,
        fallback: true
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
