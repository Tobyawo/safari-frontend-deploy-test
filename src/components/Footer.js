import React from "react";
import "../styles/Layout/_footer.scss";
import "../styles/Components/_button.scss";
import { Link } from "react-router-dom";
import { BackTop } from "antd";
import firstCheckerLogo from "../assets/firstchecker-logo.png";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <img src={firstCheckerLogo} alt="FirstChecker logo" />
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h4>About FirstChecker</h4>
            <p>
              FirstChecker is a modern consumer-to-consumer marketplace, built to
              make selling your unused or new items easier and buying securely,
              with ease.
            </p>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h4>Stay in the loop</h4>
            <form>
              <input
                className="footer-input"
                name="email"
                type="email"
                placeholder="Email address"
              />
              <input
                type="submit"
                value="OK"
                className="subscribe-button"
              />
            </form>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h4>Contact</h4>
            <p>
              A306 1004 Estate, Victoria Island,
              <br />
              Lagos, Lagos State, Nigeria.
              <br />
              +2348033681156
              <br />
              info@firstchecker.com
            </p>
          </div>
        </div>

        <BackTop>
          <button
            className="backtotop"
            id="backtotop"
            title="Go to top"
          >
            <img
              src="/images/backtotop-icon.svg"
              alt="back to top"
              className="top-icon"
            />
          </button>
        </BackTop>
      </div>
    </div>
  );
}

export default Footer;
