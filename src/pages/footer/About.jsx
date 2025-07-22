import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import aboutStyles from "./About.module.css";

const team = [
  { name: "Piyush Agrawal", role: "Full stack Developer", img: "" },
  { name: "Vishal Yadav", role: "Full stack Developer", img: "" },
  { name: "Aman Maurya", role: "Full stack Developer", img: "" },
];

export default function About() {
  return (
    <div className={aboutStyles.aboutRoot}>
      <Header />
      <section className={aboutStyles.aboutHero}>
        <h1 className={aboutStyles.aboutTitle}>About MovieBook</h1>
        <p className={aboutStyles.aboutDesc}>
          MovieBook is your one-stop platform for booking movie tickets,
          discovering the latest releases, and enjoying a seamless cinema
          experience. Our mission is to make movie-going easy, fun, and
          accessible for everyone.
        </p>
      </section>
      <section className={aboutStyles.aboutSection}>
        <h2 className={aboutStyles.aboutSectionTitle}>Our Mission</h2>
        <p className={aboutStyles.aboutSectionDesc}>
          We believe in the magic of movies. Our goal is to connect movie lovers
          with their favorite films and theaters, providing a smooth, secure,
          and enjoyable ticket booking experience. We are passionate about
          technology, design, and above all, cinema.
        </p>
        <h2 className={aboutStyles.aboutSectionTitle}>Meet the Team</h2>
        <div className={aboutStyles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={aboutStyles.teamCard}>
              <img
                src={member.img}
                alt={member.name}
                className={aboutStyles.teamImg}
              />
              <h3 className={aboutStyles.teamName}>{member.name}</h3>
              <p className={aboutStyles.teamRole}>{member.role}</p>
              <div className={aboutStyles.socialLinks}>
                <a href="#">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer className={aboutStyles.aboutFooter} />
    </div>
  );
}
