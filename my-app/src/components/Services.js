import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="row contactus ">
    <div className="col-md-6 ">
      <img
        src="./services.png.jpg"
        alt="contactus"
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-md-4">
      <p className="text-justify mt-2" style={{fontSize:"4 rem"}}>
      Online Grocery Shopping: Browse our extensive selection of fresh produce, pantry staples, and specialty items from the comfort of your home. Our user-friendly website makes shopping easy and convenient.

Home Delivery: Enjoy the convenience of having your groceries delivered right to your doorstep. We offer fast and reliable delivery options to ensure your items arrive fresh and on time.

Quality Assurance: We take pride in offering only the highest quality products. Our team carefully selects each item to ensure you receive fresh and top-notch groceries every time.

Thank you for choosing Our Retail Store. We are committed to providing you with exceptional service and quality products. Your satisfaction is our top priority!
      </p>
    </div>
  </div>

  );
}

export default Services;
