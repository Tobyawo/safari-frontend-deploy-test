import React from "react";
import heroIllustration from "../assets/firstchecker-hero.png";

function Hero() {

  return (
    <div className="hero-container slideshow-container">
      <img
        src={heroIllustration}
        alt="FirstChecker featured items"
        className="hero-image1"
      />
      <p className="collection">
        Buy and sell everyday items with FirstChecker
      </p>
      <img
        src="./images/dropdown.svg"
        alt="scroll down"
        className="checkout-collection"
      />
    </div>
  );
}

export default Hero;
