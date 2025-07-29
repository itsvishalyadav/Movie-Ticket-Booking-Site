import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCol}>
          <h3>GetMySeat</h3>
          <div className={styles.underline}></div>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Service</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h3>Get Help</h3>
          <div className={styles.underline}></div>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h3>Follow Us</h3>
          <div className={styles.underline}></div>
          <div className={styles.socialLinks}>
            <a href="https://github.com/itsvishalyadav/Movie-Ticket-Booking-Site">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} GetMySeat. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
