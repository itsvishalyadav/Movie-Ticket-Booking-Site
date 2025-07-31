import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
const ErrorMessage = ({message }) => {
  return (
    <>
    <Header/>
    <div style={{ color: "red", padding: "8px", backgroundColor: "#ffe5e5" }}>
       {message}
    </div>
    <Footer />
    </>
  );
};

export default ErrorMessage;