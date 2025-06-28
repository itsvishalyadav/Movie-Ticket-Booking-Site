import { useState } from "react";
import SmallBTN from "./SmallBTN";

export default function TrailerBtn({customStyles}) {
  const [showOverlay, setShowOverlay] = useState(false);

  const styles = {
    borderRadius: "10px",
    height: "56px",
    padding: "20px 20px",
    backgroundColor: "#f9ab00",
    fontSize: "20px",
    fontWeight: "700",
    cursor: "pointer",
    
  };
  return (
    <>
      <SmallBTN
        onClick={() => setShowOverlay(true)}
        otherStyles={{ ...styles, ...customStyles }}
        TextForButton="▶ Watch Trailer"
      />
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.74)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <iframe
            width="80%"
            height="80%"
            src="https://www.youtube.com/embed/_Z3QKkl1WyM?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 20px #F9AB00",
            }}
          ></iframe>
          <button
            onClick={() => setShowOverlay(false)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1rem",
              border: "2px solid #f9ab00",
              borderRadius: "5px",
              backgroundColor: "#1A191F",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            ✖ Close
          </button>
        </div>
      )}
    </>
  );
}
