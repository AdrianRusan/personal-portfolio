'use client';

import { useState } from 'react';
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam honeypot
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-white-200">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          className="w-full px-4 py-3 bg-black-100 border border-white/[0.1] rounded-lg text-white placeholder-white-200/50 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={255}
          className="w-full px-4 py-3 bg-black-100 border border-white/[0.1] rounded-lg text-white placeholder-white-200/50 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-white-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={1000}
          rows={6}
          className="w-full px-4 py-3 bg-black-100 border border-white/[0.1] rounded-lg text-white placeholder-white-200/50 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent transition resize-none"
          placeholder="Tell me about your project..."
        />
        <p className="text-xs text-white-200/70 text-right">
          {formData.message.length}/1000
        </p>
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-500'
              : status.type === 'error'
              ? 'bg-red-500/10 border border-red-500/20 text-red-500'
              : 'bg-blue-500/10 border border-blue-500/20 text-blue-500'
          }`}
          role="alert"
        >
          {status.message}
        </div>
      )}

      <div className="flex justify-center">
        <MagicButton
          title={status.type === 'loading' ? 'Sending...' : 'Send Message'}
          icon={<FaLocationArrow />}
          position="right"
          disabled={status.type === 'loading'}
          type="submit"
        />
      </div>
    </form>
  );
}
