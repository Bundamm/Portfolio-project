import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define form validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Imię i nazwisko musi mieć co najmniej 2 znaki.",
  }),
  email: z.string().email({
    message: "Proszę podać poprawny adres email.",
  }),
  message: z.string().min(10, {
    message: "Wiadomość musi mieć co najmniej 10 znaków.",
  }),
});

function Contact() {
  const [submitResult, setSubmitResult] = useState(null);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitResult(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      
      // Reset form after successful submission
      form.reset();
      setSubmitResult({
        success: true,
        message: 'Wiadomość została wysłana. Dziękuję za kontakt!'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kontakt</h1>
      
      <div className="max-w-2xl mx-auto">
        {submitResult && (
          <div className={`p-4 mb-6 rounded ${submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitResult.message}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię i nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan Kowalski" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan.kowalski@example.com" {...field} />
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
                  <FormLabel>Wiadomość</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Twoja wiadomość..." 
                      className="min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="w-full sm:w-auto"
            >
              {form.formState.isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </Button>
          </form>
        </Form>
        
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Inne sposoby kontaktu</h2>
          <div className="space-y-2">
            <p>Email: <a href="mailto:twoj@email.com" className="text-blue-600 hover:underline">twoj@email.com</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/twojprofil" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/twojprofil</a></p>
            <p>GitHub: <a href="https://github.com/twojprofil" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">github.com/twojprofil</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
