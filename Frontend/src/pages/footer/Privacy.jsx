import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import privacyStyles from "./Privacy.module.css";

export default function Privacy() {
  return (
    <div className={privacyStyles.privacyRoot}>
      <Header />
      <section className={privacyStyles.privacyHero}>
        <h1 className={privacyStyles.privacyTitle}>Privacy Policy</h1>
        <p className={privacyStyles.privacyDesc}>
          Your privacy is important to us. This policy explains what data we
          collect, how we use it, and your rights.
        </p>
      </section>
      <section className={privacyStyles.privacySection}>
        <h2 className={privacyStyles.privacySectionTitle}>
          1. What Data We Collect
        </h2>
        <ul className={privacyStyles.privacyList}>
          <li>Personal info (name, email, city)</li>
          <li>Booking details (movies, cinemas, seats)</li>
          <li>Usage data (pages visited, actions taken)</li>
        </ul>
        <h2 className={privacyStyles.privacySectionTitle}>
          2. How We Use Data
        </h2>
        <ul className={privacyStyles.privacyList}>
          <li>To process your bookings and payments</li>
          <li>To personalize your experience and show relevant content</li>
          <li>To improve our services and security</li>
        </ul>
        <h2 className={privacyStyles.privacySectionTitle}>3. Data Security</h2>
        <p className={privacyStyles.privacyText}>
          We use industry-standard security measures to protect your data. Your
          information is encrypted and never sold to third parties.
        </p>
        <h2 className={privacyStyles.privacySectionTitle}>4. Your Rights</h2>
        <ul className={privacyStyles.privacyList}>
          <li>Access, update, or delete your data at any time</li>
          <li>Opt out of marketing communications</li>
          <li>Contact us for any privacy concerns</li>
        </ul>
        <h2 className={privacyStyles.privacySectionTitle}>5. Contact Us</h2>
        <p className={privacyStyles.privacyText}>
          If you have questions about this policy, email us at{" "}
          <a
            href="mailto:ticktbooking@gmail.com"
            className={privacyStyles.privacyLink}
          >
            ticktbooking@gmail.com
          </a>
          .
        </p>
      </section>
      <Footer className={privacyStyles.privacyFooter} />
    </div>
  );
}
