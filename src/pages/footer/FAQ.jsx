import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import faqStyles from "./FAQ.module.css";

const faqs = [
  {
    q: "How do I book a movie ticket?",
    a: "Simply search for your movie, select your preferred showtime and seats, and complete the payment process. Your ticket will be emailed to you instantly.",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "Cancellations and changes depend on the cinema's policy. Please check your booking details or contact support for assistance.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept credit/debit cards, UPI, net banking, and popular wallets for your convenience.",
  },
  {
    q: "How do I use a promo code or offer?",
    a: "Enter your promo code during checkout. If valid, the discount will be applied automatically.",
  },
  {
    q: "I didn’t receive my ticket. What should I do?",
    a: "Check your spam folder first. If you still can't find your ticket, contact our support team at support@moviebook.com.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes, we use industry-standard encryption and never store your payment details on our servers.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className={faqStyles.faqRoot}>
      <Header />
      <section className={faqStyles.faqHero}>
        <h1 className={faqStyles.faqTitle}>FAQ</h1>
        <p className={faqStyles.faqDesc}>
          Find answers to the most common questions about MovieBook.
        </p>
      </section>
      <section className={faqStyles.faqSection}>
        {faqs.map((faq, idx) => (
          <div key={faq.q} className={faqStyles.faqItem}>
            <div
              onClick={() => setOpen(open === idx ? null : idx)}
              className={faqStyles.faqQuestion}
            >
              {faq.q}
              <span className={faqStyles.faqToggle}>{open === idx ? '−' : '+'}</span>
            </div>
            {open === idx && (
              <div className={faqStyles.faqAnswer}>{faq.a}</div>
            )}
          </div>
        ))}
      </section>
      <Footer className={faqStyles.faqFooter} />
    </div>
  );
} 