import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Form Submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Heading */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Have questions or suggestions about the Livestream + Overlay project? 
          Reach out to us via this form or the details below.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@livestreamapp.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold">Office</h3>
              <p className="text-gray-600">Lucknow, Uttar Pradesh, India</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow rounded-2xl p-6 border">
          {submitted ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-semibold text-green-600">✅ Thank you!</h3>
              <p className="text-gray-600 mt-2">
                We’ve received your message. Our team will get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
