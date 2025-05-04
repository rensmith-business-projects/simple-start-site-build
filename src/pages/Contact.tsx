
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@supabase/supabase-js";

// Empty default configuration - will be populated from Supabase secrets
const UVDESK_CONFIG = {
  apiUrl: "", 
  apiKey: "",
  ticketType: "request", 
  ticketPriority: "normal"
};

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
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        // Initialize the Supabase client - these values are automatically available on the deployed site
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL || '',
          import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        );
        
        // Fetch secrets from Supabase
        const { data, error } = await supabase.functions.invoke('get-uvdesk-secrets');
        
        if (error) {
          console.error('Error fetching UVDesk config:', error);
          toast({
            title: "Configuration error",
            description: "Couldn't load UVDesk configuration. Contact support if the issue persists.",
            variant: "destructive",
          });
          return;
        }
        
        if (data) {
          UVDESK_CONFIG.apiUrl = data.apiUrl;
          UVDESK_CONFIG.apiKey = data.apiKey;
          setConfigLoaded(true);
        }
      } catch (err) {
        console.error('Failed to load UVDesk configuration:', err);
      }
    }
    
    loadConfig();
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!configLoaded || !UVDESK_CONFIG.apiUrl || !UVDESK_CONFIG.apiKey) {
      toast({
        title: "Configuration error",
        description: "UVDesk configuration is incomplete. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting to UVDesk:", values);
      
      const ticketData = {
        name: values.name,
        from: values.email,
        subject: values.subject,
        message: values.message,
        type: UVDESK_CONFIG.ticketType,
        priority: UVDESK_CONFIG.ticketPriority,
      };
      
      const response = await fetch(UVDESK_CONFIG.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${UVDESK_CONFIG.apiKey}`
        },
        body: JSON.stringify(ticketData),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("UVDesk error response:", errorData);
        throw new Error(`Failed to submit ticket: ${response.status}`);
      }
      
      toast({
        title: "Ticket created!",
        description: "Your message has been submitted to our support team. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting to UVDesk:", error);
      toast({
        title: "Submission failed",
        description: "There was an issue creating your support ticket. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    name="message"
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Ticket...
                      </>
                    ) : 'Submit Support Request'}
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
                      <p className="text-sm text-gray-700">hello@simplestarttech.com</p>
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
                      <p className="text-sm text-gray-700">(123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-orange mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Business Hours</p>
                      <p className="text-sm text-gray-700">Monday - Friday: 9am - 5pm</p>
                      <p className="text-sm text-gray-700">Saturday - Sunday: Closed</p>
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
                  <p className="text-gray-500 mb-4">Calendly Booking Widget</p>
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Book a Time Slot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
