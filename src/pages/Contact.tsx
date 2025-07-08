
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
  frappeUrl: z.string().url({
    message: "Please enter a valid Frappe Helpdesk URL.",
  }).optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frappeUrl, setFrappeUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      frappeUrl: "/frappe.simplestart.tech",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const helpdeskUrl = frappeUrl || values.frappeUrl;
      
      if (!helpdeskUrl) {
        toast({
          title: "Configuration Required",
          description: "Please enter your Frappe Helpdesk URL to submit tickets.",
          variant: "destructive",
        });
        return;
      }

      // Create ticket in Frappe Helpdesk
      const ticketData = {
        subject: `${values.subject}: ${values.name}`,
        description: values.message,
        raised_by: values.email,
        contact: values.email,
        status: "Open",
        priority: "Medium",
        ticket_type: "Issue"
      };

      console.log("Submitting ticket to Frappe Helpdesk:", ticketData);

      const response = await fetch(`${helpdeskUrl}/api/resource/HD Ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Ticket created successfully:", result);
        
        toast({
          title: "Support ticket created!",
          description: `Your ticket has been submitted successfully. Ticket ID: ${result.data?.name || 'Generated'}`,
        });
        
        form.reset();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error("Error submitting ticket:", error);
      toast({
        title: "Submission failed",
        description: "There was an issue creating your support ticket. Please check your Frappe Helpdesk URL and try again.",
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
            Get in touch with us to discuss how we can help with your tech needs. Your message will create a support ticket in our helpdesk system.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Frappe Helpdesk Configuration */}
            <div className="bg-orange-50 p-6 md:p-8 rounded-lg shadow-md mb-8 lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Frappe Helpdesk Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="frappeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Frappe Helpdesk URL
                  </label>
                  <Input
                    id="frappeUrl"
                    type="url"
                    placeholder="https://your-helpdesk.frappe.cloud"
                    value={frappeUrl}
                    onChange={(e) => setFrappeUrl(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Enter your Frappe Helpdesk instance URL to enable ticket creation
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>
              
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
                        Creating Ticket...
                      </>
                    ) : 'Create Support Ticket'}
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
    </div>
  );
};

export default Contact;
