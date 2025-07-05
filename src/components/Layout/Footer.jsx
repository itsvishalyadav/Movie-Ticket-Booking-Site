import React from "react";
import styles from "./Footer.module.css"; // create later or remove if not using CSS modules

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} MovieBook · All rights reserved</p>
    </footer>
  );
}

export default Footer;
