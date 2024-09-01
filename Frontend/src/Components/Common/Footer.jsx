// import footerImg from "../../assets/img/footer-img.png";
import { FaYoutube } from "react-icons/fa";
import footerImg from "../../assets/img/logos/FlightSavior-White.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Footer = () => {
  const [user, ,] = useContext(UserContext);
  return (
    <div className="footer py-10 px-16">
      <div className="footer-section-1 flex flex-col md:flex-row">
        <div className="footer-box md:w-5/12 flex flex-col gap-4">
          <div className="footer-logo mb-4 mr-4">
            <img src={footerImg} alt="" />
          </div>
          <div className="footer-para md:pr-10 font-normal text-lg">
            Discover seamless travel with flightsavior.com, where we offer tailored hotel and flight 
            bookings to match your unique journey. Whether for leisure or business, our goal 
            is to make your travel experience smooth and unforgettable.
          </div>
          <div className="footer-social flex flex-row gap-6 items-center">
            <a
              href="https://www.facebook.com/FlightSavior"
              target="_blank"
              className="footer-social-icons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202z"
                ></path>
              </svg>
            </a>
            <a
              href="https://x.com/FlightSavior"
              target="_blank"
              className="footer-social-icons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578a9.3 9.3 0 0 1-2.958 1.13a4.66 4.66 0 0 0-7.938 4.25a13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568a4.692 4.692 0 0 1-2.104.08a4.661 4.661 0 0 0 4.352 3.234a9.348 9.348 0 0 1-5.786 1.995a9.5 9.5 0 0 1-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254c0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/flightsavior"
              target="_blank"
              className="footer-social-icons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7M911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165M512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@FlightSavior"
              target="_blank"
              className="footer-social-icons"
            >
              <FaYoutube size={"2.25em"} />
            </a>
          </div>
        </div>
        <div className="footer-box md:w-7/12 md:pl-12 flex flex-col justify-around pt-6">
          <div className="footer-bold-link font-semibold text-2xl mb-7 md:mb-0">
            Support
          </div>
          <div className="footer-support-links flex flex-col sm:flex-row font-normal text-xl gap-12">
            <div className="link-col-1 flex flex-col gap-6">
              <Link to="/about-us">About Us</Link>
              <Link to="/faqs">FAQ</Link>
            </div>
            <div className="link-col-2 flex flex-col gap-6">
              <Link to="/cancellation">Cancellation Protection</Link>
              <Link to="/airline-information">Airline Information</Link>
            </div>
            <div className="link-col-2 flex flex-col gap-6">
              <Link to={user ? "/user/bookings" : "/login"}>My Booking</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10 footer-divider" />
      <div className="footer-section-2 flex flex-col-reverse sm:flex-row justify-between gap-5 sm:gap-0">
        <div className="footer-copyright mx-auto sm:mx-0">
          &copy; 2024 FlightSavior, Inc.
        </div>
        <div className="footer-links flex flex-row flex-wrap sm:flex-nowrap gap-6">
          <Link to="terms-of-service">Terms of Service</Link>
          <Link to="privacy-policy">Privacy</Link>
          <Link to="security-policy">Security Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
