// import React from 'react';
import './footer.css'
function FooterSection() {
  return (
    <section className='footer-section'>
        <div className='footer-container'>
          <div className='footer-grid'>
            {/* 1st Column */}
            <div>
              <h1 className='heading-lg'>Fashi.</h1>
              <address className='contact-column'>
                <p>Address: 60-49 Road 11378 New York</p>
                <a href="tel:+65 11.188.888">Phone: +65 11.188.888</a>
                <a href="mailto:hello.colorlib@gmail.com">hello.colorlib@gmail.com</a>
              </address>
              <ul className='social-links'>
                <li><a href=""><ion-icon className='social-icon' name="logo-facebook"></ion-icon></a></li>
                <li><a href=""></a><ion-icon name="logo-instagram"></ion-icon></li>
                <li><a href=""><ion-icon name="logo-twitter"></ion-icon></a></li>
                <li><a href=""><ion-icon name="logo-pinterest"></ion-icon></a></li>
              </ul>
            </div>

            {/* 2nd Column */}
            <div className='information-column'>
              <p className='footer-heading'>Information</p>
              <nav>
                <ul className='nav-col'>
                  <li><a href="#">About us</a></li>
                  <li><a href="">Contact</a></li>
                  <li><a href="">Checkout</a></li>
                  <li><a href="">Services</a></li>
                </ul>
              </nav>
            </div>

            {/* 3rd Column */}
            <div className='my-account-column'>
            <p className='footer-heading'>My Account</p>
              <nav>
                <ul className='nav-col'>
                  <li><a href="#">My Account</a></li>
                  <li><a href="">Contact</a></li>
                  <li><a href="">Shopping Cart</a></li>
                  <li><a href="">Shop</a></li>
                </ul>
              </nav>
            </div>

            {/* 4th Column */}
            <div className='newsletter-column'>
            <p className='footer-heading text-start'>Join Our Newsletter Now</p>
            <p>Get E-mail updates about our latest shop and special offers.</p>

            <div className='subscribe'>
              <input className='subscribe-input padding-subscribe' type="text" placeholder='Enter Your Mail' />
              <button className='subscribe-btn padding-subscribe'>Subscribe</button>
            </div>
            </div>
            
          </div>
       
          <div className="border-footer"></div>
        <div className='copypay'>
        <p className='copywrite'>Copyright ©2023 All rights reserved | This template is made with <ion-icon className='heart-icon' name="heart-outline"></ion-icon> by Colorlib</p>
        <img src="https://preview.colorlib.com/theme/fashi/img/payment-method.png" alt="" />
        </div>
        </div>
        </section>
  )
}

export default FooterSection