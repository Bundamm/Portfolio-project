import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    // This is a placeholder for the API call to your server
    // Later this will connect to your PortfolioWebApp.Server
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kontakt</h1>
      
      <div className="max-w-2xl mx-auto">
        {submitResult && (
          <div className={`p-4 mb-6 rounded ${submitResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
            {submitResult.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Imię i nazwisko</Label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Wiadomość</Label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
          </Button>
        </form>
        
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
