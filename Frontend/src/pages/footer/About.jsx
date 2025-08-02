import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import aboutStyles from "./About.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const team = [
  {
    name: "Piyush Agrawal",
    role: "Full stack Developer",
    img: "",
    github: "https://github.com/piyxsh31",
    linkedIn: "https://www.linkedin.com/in/piyush-agrawal-352b57253",
  },
  {
    name: "Vishal Yadav",
    role: "Full stack Developer",
    img: "",
    github: "https://github.com/itsvishalyadav",
    linkedIn: "https://www.linkedin.com/in/vishal-yadav-iiitm",
  },
  {
    name: "Aman Maurya",
    role: "Full stack Developer",
    img: "",
    github: "https://github.com/amanthatdoescares",
    linkedIn: "https://www.linkedin.com/in/aman-maurya-895963324",
  },
];

export default function About() {
  return (
    <div className={aboutStyles.aboutRoot}>
      <Header />
      <section className={aboutStyles.aboutHero}>
        <h1 className={aboutStyles.aboutTitle}>About GetMySeat</h1>
        <p className={aboutStyles.aboutDesc}>
          GetMySeat is your one-stop platform for booking movie tickets,
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
                <a href={member.github}>
                  <FaGithub size={24} />
                </a>
                <a href={member.linkedIn}>
                  <FaLinkedin size={24} />
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
