import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { AlertCircle } from "lucide-react"; 

const ErrorMessage = ({ message }) => {
  console.error("Error:", message);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "60vh",
          backgroundColor: "#121212", 
          color: "#fff",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            width: "90%",
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            border: "1px solid rgba(255, 0, 0, 0.2)",
          }}
        >
          {/* Icon */}
          <AlertCircle size={48} color="#ff4d4d" />

          {/* Message */}
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            Oops! Something went wrong.
          </h1>
          <p
            style={{
              color: "#ccc",
              fontSize: "1rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {message}
          </p>

          {/* Button */}
          <a
            href="/"
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff3333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
          >
            Go Back Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorMessage;
