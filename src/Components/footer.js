import React,{useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import logo from '../images/Temoshoroyal.jpg';


const Footer = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };


  const sendEmail = (e) => {
    setLoading(true); 
    e.preventDefault();

    emailjs
      .sendForm('service_6v41z8s', 'template_xtapfn8', form.current, 'gfSpZlYXHAxPUBS1v')
      .then(
        (result) => {
          setLoading(false); 
          console.log(result.text)
          form.current.reset();
          
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('Error sending message. Please try again later.');
        }
      );
      
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Book your stay with us and embrace the Luxury Hotels experience. Redefine luxury at the most affordable rates and create lasting memories with us.</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
              <Link to="/">Rooms</Link>
            
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <form ref={form} onSubmit={sendEmail}>
      <div className="pt-0 mb-3">
        <input
          type="text"
          placeholder="Your name"
          name="user_name"
          required
          onFocus={() => handleFocus('user_name')}
          onBlur={handleBlur}
          style={{ color: focusedInput === 'user_name' ? 'black' : 'black' }}
        />
      </div>
      <div className="pt-0 mb-3">
        <input
          type="email"
          placeholder="Email"
          name="user_email"
          required
          onFocus={() => handleFocus('user_email')}
          onBlur={handleBlur}
          style={{ color: focusedInput === 'user_email' ? 'black' : 'black' }}
        />
      </div>
      <div className="pt-0 mb-3">
        <input
          type="subject"
          placeholder="Subject"
          name="subject"
          required
          onFocus={() => handleFocus('subject')}
          onBlur={handleBlur}
          style={{ color: focusedInput === 'subject' ? 'black' : 'black' }}
        />
      </div>
      <div className="pt-0 mb-3">
        <textarea
          placeholder="Your message"
          name="message"
          required
          onFocus={() => handleFocus('message')}
          onBlur={handleBlur}
          style={{ color: focusedInput === 'message' ? 'black' : 'black' }}
        />
      </div>
      <div className="pt-0 mb-3">
        <button type="submit">Send a message</button>
      </div>
    </form>
    {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            ''
          )}
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-icons">
            
            <a href="https://www.facebook.com/temosho.shaku" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://github.com/TemoshoS" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/temosho-shaku-a2598917b/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
           
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 Temosho Shaku. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
