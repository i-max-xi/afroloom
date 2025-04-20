import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import { Carousel } from 'react-bootstrap';
import { Timeline } from 'primereact/timeline';
import ListItem from '../Components/List/ListItem';

const HomePage = () => {
  const carousel1 = require('../Assets/HomePage/landing-page-re-1.jpg');
  const carousel2 = require('../Assets/HomePage/landing-page-re-2.jpg');
  const carousel3 = require('../Assets/HomePage/landing-page-re-3.jpg');
  const carousel4 = require('../Assets/HomePage/landing-page-re-4.jpg');

  const perfectFit = require('../Assets/HomePage/Perfect Fit Guarantee .jpg');
  const qualityFabric = require('../Assets/HomePage/Bulk African wax print fabrics - Flowery African Wax Print - 6 yards.jpg');
  const convenientOnlineProcess = require('../Assets/HomePage/Convenient-Online-Process.png');

  //timeline
  const timeline1 = '';
  const timeline2 = '';
  const timeline3 = '';
  const timeline4 = '';

  const carousel = [
    { image: carousel1, alt: 'Carousel Image 1' },
    { image: carousel2, alt: 'Carousel Image 2' },
    { image: carousel3, alt: 'Carousel Image 3' },
    { image: carousel4, alt: 'Carousel Image 4' },
  ];

  const stepContents = [
    {
      label: 'Select Product',
      icon: 'pi pi-shopping-cart',
      description:
        'Browse our extensive collection of high-quality Products. Our collection consists of clothing, accessories and more.',
      image: timeline1,
    },
    {
      label: 'Personalize',
      icon: 'pi pi-pencil',
      description:
        'Use our intuitive design tools to customize chosen product. Whether it’s adding a personalized message to a graduation sash or choosing unique colors.',
      image: timeline2,
    },
    {
      label: 'Place Your Order',
      icon: 'pi pi-check',
      description:
        'Review your custom selections, make any final adjustments, and place your order with options for part payment. We take care of the rest!',
      image: timeline3,
    },
    {
      label: 'Delivery',
      icon: 'pi pi-truck',
      description:
        'Complete final payment upon delivery if applicable, ensuring a secure and satisfactory transaction.',
      image: timeline4,
    },

    // { label: 'Input Your Measurements', description: 'Use our simple measurement guide to ensure a perfect fit. Enter your measurements for a tailored experience.', image: timeline2 },
    // { label: 'Design Your Graduation Sash', description: 'Choose your graduation colors and input your personalized message. Celebrate your achievements in style!', image: timeline3 },
    // { label: 'Personalize Your Bead Bracelet', description: 'Select your bead colors and add a meaningful text to create a unique piece of jewelry.', image: timeline4 },
  ];

  const why_choose_afroloom = [
    {
      title: 'High-Quality Materials',
      description:
        'We use only the best fabrics and materials to ensure your garments and accessories are of the highest quality.',
      image: qualityFabric,
    },
    {
      title: 'Perfect Fit Guarantee',
      description:
        'Our custom tailoring ensures that your clothes fit perfectly every time.',
      image: perfectFit,
    },
    {
      title: 'Convenient Online Process',
      description:
        'From selecting fabrics to receiving your finished product, everything is done online for your convenience.',
      image: convenientOnlineProcess,
    },
  ];

  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker p-shadow-2"
        style={{
          backgroundColor: '#ffc107',
          borderRadius: '50%',
          padding: '0.1rem 0.3rem',
        }}
      >
        <span className={item.icon} style={{ color: '#ffffff' }}></span>
      </span>
    );
  };

  const customizedContent = (item) => {
    return (
      <div style={{ textAlign: 'start' }} className="custom-content p-shadow-2">
        <h3 className="text-lg lg:text-xl">{item.label}</h3>
        <p className="text-sm lg:text-lg">{item.description}</p>
        {/* <img src={item.image} alt={item.label} className="img-fluid" /> */}
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <section className="hero-section">
        <Carousel>
          {carousel.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                loading="lazy"
                className="d-block w-100"
                src={item.image}
                alt={item.alt}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className=" p-5 px-4 container ">
          <h2 className="text-xl lg:text-3xl ">
            Create It. Shop It. Wear It Your Way!
          </h2>
          <p className="text-sm">
            At Afroloom, we bring your fashion dreams to life with easy online
            tailoring and our Loom Store, where you can shop stunning
            ready-to-wear Afrocentric pieces or create your own. From custom
            outfits and graduation sashes to unique bead bracelets, enjoy
            personalized fashion made just for you — all from the
            comfort of your home.
          </p>
          <div className="flex gap-2 items-center">
            <Link to="/order-to-sew">
              <button className=" bg-yellow-500 text-white  text-left text-sm p-2 rounded-lg hover:bg-yellow-600">
                Order to get it sewed
              </button>
            </Link>
            <Link to="/shop">
              <button className="rounded-lg border-1 border-yellow-500 text-black font-medium px-4 py-2">
                Go to Store
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container my-10">
        <section className="lg:px-4">
          <h2 className="footer-header text-xl lg:text-3xl mt-4">
            How It Works
          </h2>
          <Timeline
            value={stepContents}
            align="alternate"
            marker={customizedMarker}
            content={customizedContent}
          />
        </section>

        <section className="px-4 ">
          <h2 className="footer-header text-xl lg:text-3xl">
            Why Choose Afroloom?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center items-center  lg:px-3">
            {why_choose_afroloom.map((item, index) => (
              <ListItem {...item} key={index} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default HomePage;
