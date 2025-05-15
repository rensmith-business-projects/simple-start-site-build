import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  reply: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [showFallbackDialog, setShowFallbackDialog] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<any>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log("Testing UVDesk configuration...");
        
        // Fetch secrets from Supabase edge function
        const { data, error } = await supabase.functions.invoke('get-uvdesk-secrets');
        
        if (error) {
          console.error('Error fetching UVDesk config:', error);
          setConfigError(`Config error: ${error.message}`);
          toast({
            title: "Configuration error",
            description: "Couldn't load UVDesk configuration. Contact support if the issue persists.",
            variant: "destructive",
          });
          return;
        }
        
        if (!data || !data.apiUrl || !data.apiKey) {
          console.error('Invalid UVDesk config data:', data);
          setConfigError("Missing API URL or key in configuration");
          toast({
            title: "Configuration error",
            description: "UVDesk configuration is incomplete. Please check Supabase secrets.",
            variant: "destructive",
          });
          return;
        }
        
        console.log("UVDesk configuration loaded successfully");
        setConfigLoaded(true);
      } catch (err) {
        console.error('Failed to load UVDesk configuration:', err);
        setConfigError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    
    testConnection();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      reply: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!configLoaded) {
      toast({
        title: "Configuration error",
        description: "UVDesk configuration is incomplete. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Preparing ticket data for UVDesk:", values);
      
      const ticketData = {
        name: values.name,
        from: values.email,
        subject: values.subject,
        reply: values.reply,
      };
      
      console.log("Submitting ticket to create-uvdesk-ticket function");
      
      // Use the dedicated create-ticket function
      const { data, error } = await supabase.functions.invoke('create-uvdesk-ticket', {
        body: ticketData
      });
      
      if (error) {
        console.error("Error from create-uvdesk-ticket function:", error);
        throw new Error(`Function error: ${error.message}`);
      }
      
      // Check if we need to use fallback method (email)
      if (data.fallback) {
        console.log("UVDesk API unavailable, showing fallback instructions:", data);
        setFallbackMessage({
          name: values.name,
          email: values.email,
          subject: values.subject,
          reply: values.reply,
          error: data.error || "UVDesk API is currently unavailable"
        });
        setShowFallbackDialog(true);
        return;
      }
      
      if (data.error) {
        console.error("UVDesk ticket creation failed:", data.error);
        throw new Error(data.error);
      }
      
      console.log("UVDesk ticket created successfully:", data);
      
      toast({
        title: "Ticket created!",
        description: "Your message has been submitted to our support team. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting support ticket:", error);
      toast({
        title: "Submission failed",
        description: `There was an issue creating your support ticket: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy text to clipboard.",
          variant: "destructive",
        });
      }
    );
  };

  // Format message for copying
  const getFormattedMessage = () => {
    if (!fallbackMessage) return "";
    
    return `Name: ${fallbackMessage.name}
Email: ${fallbackMessage.email}
Subject: ${fallbackMessage.subject}

${fallbackMessage.message}`;
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us to discuss how we can help with your tech needs.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {configError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>UVDesk configuration error</AlertTitle>
                  <AlertDescription>
                    <p>{configError}</p>
                    <p className="mt-2 text-sm">Please contact the administrator to check Supabase secrets.</p>
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange transition"
                            {...field}
                          >
                            <option value="">Select a subject</option>
                            <option value="Website Setup">Website Setup</option>
                            <option value="Email Configuration">Email Configuration</option>
                            <option value="Cloud Apps Setup">Cloud Apps Setup</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="resize-none" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting || !configLoaded}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Ticket...
                      </>
                    ) : !configLoaded ? 'Loading Configuration...' : 'Submit Support Request'}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Information & Calendly */}
            <div>
              <div className="bg-cream p-6 md:p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-orange mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-700">contact@simplestart.tech</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-orange mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-700">+61 (03) 9685 7241</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
                <p className="text-gray-700 mb-6">
                  Schedule a free 15-minute consultation to discuss your tech needs.
                </p>
                
                {/* Placeholder for Calendly - in a real app, this would be a Calendly embed */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <a href="https://calendly.com/contactbeau7" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Book a Time Slot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fallback Dialog for when UVDesk API is unavailable */}
      <Dialog open={showFallbackDialog} onOpenChange={setShowFallbackDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>UVDesk API Unavailable</DialogTitle>
            <DialogDescription>
              We couldn't submit your ticket directly to our support system. Please use one of these alternatives:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Alert>
              <AlertTitle>Trial Plan Limitation</AlertTitle>
              <AlertDescription>
                UVDesk trial plans don't support API access. Please send your message directly via email.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h4 className="font-medium">Email us directly:</h4>
              <p className="text-sm">
                <a 
                  href={`mailto:contact@simplestart.tech?subject=${encodeURIComponent(fallbackMessage?.subject || '')}&body=${encodeURIComponent(fallbackMessage?.message || '')}`}
                  className="text-blue-600 hover:underline"
                >
                  contact@simplestart.tech
                </a>
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Or copy your message:</h4>
              <div className="bg-gray-100 p-3 rounded-md text-sm overflow-auto max-h-40">
                <pre>{getFormattedMessage()}</pre>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => copyToClipboard(getFormattedMessage())}
              >
                Copy to Clipboard
              </Button>
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => setShowFallbackDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
