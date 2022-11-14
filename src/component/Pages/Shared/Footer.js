import React from "react";
import footerImage from "../../../assets/images/footer.png";

const Footer = () => {
  return (
    <footer
      style={{ background: `url(${footerImage})`, backgroundSize: "cover" }}
      className="p-10"
    >
      <div className="footer pt-12">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Oral health</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Our address</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </div>
      <div className="text-center pt-12">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Laundry
        </p>
      </div>
    </footer>
  );
};

export default Footer;
