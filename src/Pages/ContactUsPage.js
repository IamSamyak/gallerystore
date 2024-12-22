import React, { useState } from "react";
import axios from 'axios';
import "./ContactUsPage.css";
import config from '../config/config';

const ContactUsPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    query: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Use the existing formData state directly
    axios.post(`${config.BASE_URL}/api/contact-us/send`, formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        alert('Your message has been sent successfully!');
      })
      .catch((error) => {
        console.error("There was an error sending the form data:", error);
        alert('There was an error sending your message. Please try again.');
      });
  };
 

  return (
    <div className="contact_us_6 mycontainer">
      <div className="responsive-container-block container">
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="container-block form-wrapper">
            <div className="mob-text">
              <p className="text-blk contactus-head">Get in Touch</p>
              <p className="text-blk contactus-subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                diam lectus sapien.
              </p>
            </div>
            <div className="responsive-container-block" id="i2cbk">
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="i10mt-3"
              >
                <p className="text-blk input-title">FULL NAME</p>
                <input
                  className="input"
                  id="ijowk-3"
                  name="fullName"
                  placeholder="Please enter full name..."
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="ip1yp"
              >
                <p className="text-blk input-title">EMAIL</p>
                <input
                  className="input"
                  id="ipmgh-3"
                  name="email"
                  placeholder="Please enter email..."
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="ih9wi"
              >
                <p className="text-blk input-title">PHONE NUMBER</p>
                <input
                  className="input"
                  id="imgis-3"
                  name="phoneNumber"
                  placeholder="Please enter phone number..."
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                id="i634i-3"
              >
                <p className="text-blk input-title">WHAT DO YOU HAVE IN MIND?</p>
                <textarea
                  className="textinput"
                  id="i5vyy-3"
                  name="query"
                  placeholder="Please enter query..."
                  value={formData.query}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <button className="submit-btn" id="w-c-s-bgc_p-1-dm-id-2">
              Submit
            </button>
          </div>
        </form>
        <div
          className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12"
          id="i772w"
        >
          <div className="map-part">
            <p className="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
              Reach us at
            </p>
            <p className="text-blk map-contactus-subhead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
              diam lectus sapien.
            </p>
            <div className="social-media-links mob">
              <a className="social-icon-link" href="#" id="ix94i-2-2">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                  alt="Twitter"
                />
              </a>
              <a className="social-icon-link" href="#" id="itixd">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                  alt="Facebook"
                />
              </a>
              <a className="social-icon-link" href="#" id="izxvt">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                  alt="Google"
                />
              </a>
              <a className="social-icon-link" href="#" id="izldf-2-2">
                <img
                  className="link-img image-block"
                  src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                  alt="Instagram"
                />
              </a>
            </div>
            <div
              className="map-box container-block"
              style={{
                height: "520px", // Increased height
                width: "100%",
              }}
            >
              <iframe
                title="Yavatmal Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60302.78196019489!2d78.141402!3d20.381109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd378d3b2957787%3A0xdbb2e204c4774ce6!2sYavatmal%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1685804461887!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
 