import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import servicesStyles from "./Services.module.css";

const services = [
  {
    icon: "🎟️",
    title: "Online Ticket Booking",
    desc: "Book movie tickets instantly for your favorite cinemas with a seamless, secure, and fast process.",
  },
  {
    icon: "🎬",
    title: "Latest Movie Listings",
    desc: "Stay updated with the latest releases, top-rated, and trending movies, all in one place.",
  },
  {
    icon: "🏷️",
    title: "Exclusive Offers",
    desc: "Enjoy special discounts, cashback, and exclusive deals on your bookings.",
  },
  {
    icon: "📍",
    title: "Nearby Cinemas",
    desc: "Find cinemas near you, check showtimes, and pick the best seats for your experience.",
  },
  {
    icon: "⭐",
    title: "User Reviews & Ratings",
    desc: "Read and share reviews, and check ratings to make informed movie choices.",
  },
];

export default function Services() {
  return (
    <div className={servicesStyles.servicesRoot}>
      <Header />
      <section className={servicesStyles.servicesHero}>
        <h1 className={servicesStyles.servicesTitle}>Our Services</h1>
        <p className={servicesStyles.servicesDesc}>
          Everything you need for a perfect movie night, right at your fingertips.
        </p>
      </section>
      <section className={servicesStyles.servicesSection}>
        <div className={servicesStyles.servicesGrid}>
          {services.map(service => (
            <div key={service.title} className={servicesStyles.serviceCard}>
              <div className={servicesStyles.serviceIcon}>{service.icon}</div>
              <h3 className={servicesStyles.serviceCardTitle}>{service.title}</h3>
              <p className={servicesStyles.serviceCardDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer className={servicesStyles.servicesFooter} />
    </div>
  );
} 