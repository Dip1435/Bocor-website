import "./assets/css/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/vendor/boxicons/css/boxicons.min.css"
import "./assets/vendor/bootstrap/css/bootstrap.min.css"
import "./assets/vendor/glightbox/css/glightbox.min.css"
import "./assets/vendor/swiper/swiper-bundle.min.css"
import "aos/dist/aos.css";
import AOS from 'aos';
import { useEffect } from "react";
import RoutePaths from "./RoutePaths/RoutePaths";
import ScrollToTopButton from "./Components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// import "./js/main.js"

function App() {

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
    });
  },[])
  return (
    <>
    <ScrollToTopButton />
     <RoutePaths />
     <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

    </>
  );
}

export default App;
