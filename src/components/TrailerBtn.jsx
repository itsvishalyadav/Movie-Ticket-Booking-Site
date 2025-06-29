import { useState } from "react";
import SmallBTN from "./SmallBTN";
import "./TrailerBtn.css";

export default function TrailerBtn({ customStyles }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const styles = {
    borderRadius: "10px",
    height: "56px",
    padding: "20px 25px",
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
        <div className="overlay  ">
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
          <button onClick={() => setShowOverlay(false)} className="close-btn">
            ✖ Close
          </button>
        </div>
      )}
    </>
  );
}
