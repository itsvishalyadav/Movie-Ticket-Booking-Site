import { useState } from "react";
import "./TrailerBtn.css";
import BigBTN from "./BigBTN";

export default function TrailerBtn() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <BigBTN
        onClick={() => setShowOverlay(true)}
        TextForButton="▶ Watch Trailer"
      />
      {showOverlay && (
        <div className="overlay">
          <iframe
            width="80%"
            height="80%"
            src="https://www.youtube.com/embed/_Z3QKkl1WyM?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "0.625rem",
              boxShadow: "0 0 1.25rem #F9AB00",
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
