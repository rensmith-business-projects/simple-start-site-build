
import { useState } from 'react';
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

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Webhook URL - you can configure this in your webhook service
  const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_KEY/";

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

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get in touch with us to discuss how we can help with your tech needs. Your message will be processed through our webhook system.
          </p>
        </div>
      </section>

      {/* Webhook Info */}
      <section className="py-4 px-4 bg-blue-50 border-l-4 border-blue-400">
        <div className="container mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Webhook Integration:</strong> This form uses webhooks to process your submission. Configure your webhook URL in the code to connect to your preferred service (Zapier, Make, n8n, etc.).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
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
            
            {/* Contact Information & Webhook Guide */}
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
                </div>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
                <p className="text-gray-700 mb-6">
                  Schedule a free 15-minute consultation to discuss your tech needs.
                </p>
                
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

      {/* Webhook Setup Guide */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Webhook Setup Guide</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">What are Webhooks?</h3>
              <p className="text-gray-700 mb-4">
                Webhooks are HTTP callbacks that allow one application to send real-time data to another application when specific events occur. 
                Instead of polling for changes, webhooks push data to your endpoint immediately when something happens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 1: Choose a Webhook Service</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Zapier:</strong> Easy to use, connects to 6000+ apps</li>
                <li><strong>Make (formerly Integromat):</strong> More advanced automation features</li>
                <li><strong>n8n:</strong> Open-source alternative with self-hosting options</li>
                <li><strong>Webhooks.site:</strong> Great for testing webhook URLs</li>
                <li><strong>Custom Server:</strong> Build your own webhook endpoint</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 2: Set Up Your Webhook (Zapier Example)</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Create a new Zap in Zapier</li>
                <li>Choose "Webhooks by Zapier" as the trigger app</li>
                <li>Select "Catch Hook" as the trigger event</li>
                <li>Copy the webhook URL provided by Zapier</li>
                <li>Replace the WEBHOOK_URL in the code with your actual URL</li>
                <li>Set up actions (create Frappe ticket, send email, etc.)</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 3: Configure Actions</h3>
              <p className="text-gray-700 mb-4">Once your webhook receives the form data, you can:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Create tickets in Frappe Helpdesk</li>
                <li>Send email notifications</li>
                <li>Add data to Google Sheets or Airtable</li>
                <li>Send Slack/Teams notifications</li>
                <li>Store data in databases</li>
                <li>Trigger other automations</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 4: Test Your Webhook</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Fill out the contact form above</li>
                <li>Check your webhook service dashboard</li>
                <li>Verify the data was received correctly</li>
                <li>Test your configured actions</li>
                <li>Monitor for any errors or issues</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Data Structure Sent to Webhook</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "IT Support",
  "message": "Need help with...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "Contact Form",
  "user_agent": "Mozilla/5.0...",
  "page_url": "https://yoursite.com/contact"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
