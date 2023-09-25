import React from 'react';
import '../../Styles/Offers.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const ClickableBanner = () => {
  const items = [
    {
      title: 'Dont miss out on these discounts',
      imageUrl: 'https://toppng.com/uploads/thumbnail/special-discount-sign-11552764408sqj0xsny4c.png',
    },
    {
      title: 'Design your own custom products',
      videoUrl: 'url_to_video', // Replace with the URL to your video
      link: '/item-2-link',
    },
    {
      title: 'Your #1 source of African fabrics',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/5ebf5fe07d332a028bf1e9f6/1667427305938-0HO9NVNXRF3ROH1JRJPL/array-orange-fabrics.jpg',
      link: '/item-3-link',
    },
    {
      title: 'Choose to look classy',
      imageUrl: 'https://emaratshop.com/cdn/shop/products/ORANGEDSK_fec7dbb9-058d-4b0a-876a-b376604d6f91.png?v=1602629732',
      link: '/item-4-link',
    },
  ];

  return (
    <div className="clickable-banner">
      {items.map((item, index) => (
        <Link to={item.link} className="clickable-item" key={index}>
          {item.videoUrl ? (
            <video src={item.videoUrl} alt={item.title} className="item-video" autoPlay loop muted />
          ) : (
            <img src={item.imageUrl} alt={item.title} className="item-image" />
          )}
          <h4 className="item-title">{item.title}</h4>
        </Link>
      ))}
    </div>
  );
};

export default ClickableBanner;
