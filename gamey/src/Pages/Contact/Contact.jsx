import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Socials from '../../Components/Socials/Socials';
import "./Contact .css"
 export default function Contact(){
  return (
    <>
      <Navbar/>
      <div className="contact-container">
        <h1 className="page-title">Drop a Message</h1>
        <p className="subtext">Have questions about Gamey? Want to report a bug or suggest a feature? We'd love to hear from you!</p>
        
        <div className="contact-grid">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input className="input"type="text" id="name" name="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input className="input"type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input className="input"type="text" id="subject" name="subject" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea className="input" name="message" required></textarea>
              </div>
              <button className="butto"type="submit">Send Message</button>
            </form>
          </div>
          
          <div className="contact-info">
            <div className="info-card">
              <h3>Contact Information</h3>
              
              <div className="contact-method">
                <div className="icon">📧</div>
                <div className="details">
                  <p><strong>Email</strong></p>
                  <p>ridingknight2@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="icon">📱</div>
                <div className="details">
                  <p><strong>Phone</strong></p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="icon">🏢</div>
                <div className="details">
                  <p><strong>Office</strong></p>
                  <p>Whitefeild Bangalore<br />Gamey, IN 567890</p>
                </div>
              </div>
            </div>
            <div className="info-card">
              <h3>Support Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      <Socials/>
    </>
  )
 }