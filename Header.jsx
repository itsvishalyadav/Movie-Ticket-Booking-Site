// src/components/Header.jsx
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  MapPin,
  ChevronDown,
  Search,
  Ticket,
  Tag,
  User2,
  Menu,
  X,
} from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* ---------- Left: Logo + City ---------- */}
      <div className={styles.left}>
        <a href="/" className={styles.logo}>
          Movie<span>Book</span>
        </a>

        {/* Radix Select for city */}
        <Select.Root defaultValue="Delhi">
          <Select.Trigger
            className={styles.cityTrigger}
            aria-label="Select your city"
          >
            <MapPin size={16} />
            <Select.Value placeholder="Select city" />
            <Select.Icon className={styles.cityChevron}>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              side="bottom"
              position="popper"
              className={styles.cityContent}
            >
              <Select.Viewport className={styles.cityViewport}>
                {[
                  ["Delhi", "New Delhi"],
                  ["Mumbai", "Mumbai"],
                  ["Bangalore", "Bangalore"],
                  ["Hyderabad", "Hyderabad"],
                ].map(([value, label]) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className={styles.cityItem}
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* ---------- Center: Search ---------- */}
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Movies, cinemas, shows…"
          className={styles.searchInput}
        />
      </form>

      {/* ---------- Right: Nav + Profile ---------- */}
      <nav className={`${styles.right} ${mobileOpen ? styles.rightOpen : ""}`}>
        <a href="#" className={styles.navItem}>
          <Ticket size={18} /> <span>My Bookings</span>
        </a>
        <a href="#" className={styles.navItem}>
          <Tag size={18} /> <span>Offers</span>
        </a>
        <button className={styles.profile} aria-label="Profile">
          <User2 size={20} />
        </button>
      </nav>

      {/* ---------- Burger (mobile) ---------- */}
      <button
        className={styles.burger}
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((p) => !p)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
