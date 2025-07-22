import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import termsStyles from "./Terms.module.css";

export default function Terms() {
  return (
    <div className={termsStyles.termsRoot}>
      <Header />
      <section className={termsStyles.termsHero}>
        <h1 className={termsStyles.termsTitle}>Terms Of Service</h1>
        <p className={termsStyles.termsDesc}>
          Please read these terms carefully before using MovieBook. By using our site, you agree to these terms.
        </p>
      </section>
      <section className={termsStyles.termsSection}>
        <h2 className={termsStyles.termsSectionTitle}>1. Acceptance of Terms</h2>
        <p className={termsStyles.termsText}>
          By accessing or using MovieBook, you agree to comply with these Terms of Service and all applicable laws.
        </p>
        <h2 className={termsStyles.termsSectionTitle}>2. User Responsibilities</h2>
        <ul className={termsStyles.termsList}>
          <li>Provide accurate information during registration and booking</li>
          <li>Keep your account credentials secure</li>
          <li>Use the site for lawful purposes only</li>
        </ul>
        <h2 className={termsStyles.termsSectionTitle}>3. Booking Policy</h2>
        <ul className={termsStyles.termsList}>
          <li>All bookings are subject to availability and confirmation</li>
          <li>Tickets are non-transferable and non-refundable unless stated otherwise</li>
        </ul>
        <h2 className={termsStyles.termsSectionTitle}>4. Cancellations & Changes</h2>
        <ul className={termsStyles.termsList}>
          <li>Cancellation and change policies may vary by cinema and show</li>
          <li>Check your booking details for specific terms</li>
        </ul>
        <h2 className={termsStyles.termsSectionTitle}>5. Limitation of Liability</h2>
        <p className={termsStyles.termsText}>
          MovieBook is not liable for any indirect, incidental, or consequential damages arising from your use of the site.
        </p>
        <h2 className={termsStyles.termsSectionTitle}>6. Contact Us</h2>
        <p className={termsStyles.termsText}>
          For questions about these terms, email us at <a href="mailto:moviebook@gmail.com" className={termsStyles.termsLink}>moviebook@gmail.com</a>.
        </p>
      </section>
      <Footer className={termsStyles.termsFooter} />
    </div>
  );
} 