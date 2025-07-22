import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import contactStyles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={contactStyles.contactRoot}>
      <Header />
      <section className={contactStyles.contactHero}>
        <h1 className={contactStyles.contactTitle}>Contact Us</h1>
        <p className={contactStyles.contactDesc}>
          Have a question or need help? Reach out to us!
        </p>
      </section>
      <section className={contactStyles.contactSection}>
        <div className={contactStyles.contactFormCard}>
          {submitted ? (
            <div className={contactStyles.contactThankYou}>
              Thank you for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={contactStyles.contactForm}>
                <label className={contactStyles.contactLabel} htmlFor="name">Name</label>
                <input
                  className={contactStyles.contactInput}
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label className={contactStyles.contactLabel} htmlFor="email">Email</label>
                <input
                  className={contactStyles.contactInput}
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label className={contactStyles.contactLabel} htmlFor="message">Message</label>
                <textarea
                  className={contactStyles.contactTextarea}
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className={contactStyles.contactButton}
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={contactStyles.contactInfo}>
          <div className={contactStyles.contactInfoRow}><b>Email:</b> <a href="mailto:moviebook@gmail.com">moviebook@gmail.com</a></div>
          <div><b>Phone:</b> +91-9999999999</div>
        </div>
      </section>
      <Footer className={contactStyles.contactFooter} />
    </div>
  );
} 