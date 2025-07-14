
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

const frappeFormSchema = z.object({
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFrappeSubmitting, setIsFrappeSubmitting] = useState(false);
  
  // Webhook URL - you can configure this in your webhook service
  const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_KEY/";

  // Frappe configuration
  const FRAPPE_SITE_URL = "https://frappe.simplestart.tech";
  const API_KEY = "8483601ba924cb2";
  const API_SECRET = "6743df0d13ae55c";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const frappeForm = useForm<z.infer<typeof frappeFormSchema>>({
    resolver: zodResolver(frappeFormSchema),
    defaultValues: {
      subject: "",
      email: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      const webhookData = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
        timestamp: new Date().toISOString(),
        source: "Contact Form",
        // Additional metadata
        user_agent: navigator.userAgent,
        page_url: window.location.href
      };

      console.log("Sending data to webhook:", webhookData);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        console.log("Webhook triggered successfully");
        
        toast({
          title: "Support request submitted!",
          description: "Your message has been sent successfully. We'll get back to you soon!",
        });
        
        form.reset();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error sending webhook:", error);
      
      toast({
        title: "Submission failed",
        description: "There was an issue sending your message. Please try again or contact us directly using the information below.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFrappeSubmit = async (values: z.infer<typeof frappeFormSchema>) => {
    setIsFrappeSubmitting(true);
    
    try {
      console.log("Submitting ticket to Frappe:", values);

      const response = await fetch(`${FRAPPE_SITE_URL}/api/resource/Issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${API_KEY}:${API_SECRET}`
        },
        body: JSON.stringify({
          subject: values.subject,
          raised_by: values.email,
          issue_type: "General",
          priority: "Medium",
          description: values.description
        })
      });

      const result = await response.json();

      if (response.ok && result.data && result.data.name) {
        toast({
          title: "Ticket submitted successfully!",
          description: `Your ticket has been created with ID: ${result.data.name}`,
        });
        
        frappeForm.reset();
      } else {
        throw new Error(result.message || 'Failed to create ticket');
      }
      
    } catch (error) {
      console.error("Error submitting Frappe ticket:", error);
      
      toast({
        title: "Ticket submission failed",
        description: "There was an issue creating your ticket. Please try the webhook form instead or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsFrappeSubmitting(false);
    }
  };

  // Add useEffect to load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us to discuss how we can help with your tech needs. Choose between our webhook integration or direct ticket submission.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Webhook Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Message via Webhook</h2>
              
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
                            <option value="Technical Issue">Technical Issue</option>
                            <option value="Feature Request">Feature Request</option>
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
                            placeholder="Describe your issue or request in detail..." 
                            className="resize-none" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Direct Frappe Ticket Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Submit a Ticket</h2>
              <p className="text-sm text-gray-600 mb-4">Direct submission to SimpleStart Helpdesk</p>
              
              <Form {...frappeForm}>
                <form onSubmit={frappeForm.handleSubmit(onFrappeSubmit)} className="space-y-6">
                  <FormField
                    control={frappeForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of your issue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={frappeForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={frappeForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide detailed information about your issue..." 
                            className="resize-none" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isFrappeSubmitting}>
                    {isFrappeSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Ticket...
                      </>
                    ) : 'Submit Ticket'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Contact Information & Calendly */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-cream p-6 md:p-8 rounded-lg shadow-md">
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
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
              <p className="text-gray-700 mb-6">
                Schedule a free 30-minute consultation to discuss your tech needs.
              </p>
              
              {/* Calendly inline widget */}
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/contactbeau7/30min" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Webhook Setup Guide */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Integration Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Webhook Integration</h3>
              <p className="text-gray-700 mb-4">
                The webhook form allows you to connect to any automation service like Zapier, Make, or n8n. 
                Configure your webhook URL in the code to process form submissions.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Connect to 6000+ apps via Zapier</li>
                <li>Advanced automation with Make</li>
                <li>Custom integrations with n8n</li>
                <li>Flexible data processing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Direct Frappe Tickets</h3>
              <p className="text-gray-700 mb-4">
                Submit tickets directly to the SimpleStart Helpdesk system. This creates tickets 
                immediately in our support system for faster response times.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Immediate ticket creation</li>
                <li>Automatic ticket ID generation</li>
                <li>Direct integration with support team</li>
                <li>Priority and categorization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
