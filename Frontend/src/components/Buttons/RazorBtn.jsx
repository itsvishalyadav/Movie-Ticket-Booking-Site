import React, { useEffect, useRef } from "react";

const RazorpayButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const scriptId = "razorpay-embed-btn-js";

    // Check if script is already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // If script is already loaded, re-initialize it
      const rzp = window["__rzp__"];
      if (rzp && rzp.init) {
        rzp.init();
      }
    }
  }, []);

  return (
    <div
      ref={buttonRef}
      className="razorpay-embed-btn"
      data-url="https://pages.razorpay.com/pl_QywhkyvyTgTHCS/view"
      data-text="Purchase Seat"
      data-color="#528FF0"
      data-size="small"
    />
  );
};

export default RazorpayButton;
