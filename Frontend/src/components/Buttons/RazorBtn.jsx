import React, { useEffect } from "react";

const RazorpayButton = ({ amount, onSuccess, selectedSeats }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK is still loading. Please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_test_mbgfqHptub6vIY",
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "GetMySeat",
      description: `Booking for ${selectedSeats.length} seats`,
      handler: function (response) {
        // Handle successful payment
        if (onSuccess) {
          onSuccess(response);
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      notes: {
        seats: selectedSeats.join(", "),
      },
      theme: {
        color: "#528FF0",
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(
          "Payment failed. Please try again. Error: " +
            response.error.description
        );
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay initialization error:", error);
      alert("Could not initialize payment. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#f9ab00",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        width: "100%",
        marginTop: "10px",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 10px rgba(249, 171, 0, 0.6)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      disabled={!selectedSeats || selectedSeats.length === 0}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
