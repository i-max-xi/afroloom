import React, { useEffect, useState } from 'react';
import { FooterContact2 } from '../../Components/FooterContact';
import ContactForm from '../../Components/ContactForm';
import contactInfo from '../../Data/contactList';
import LayoutHeaders from '../../Components/LayoutHeaders';

const Top = '/assets/Headers/contactus.jpg';

const ContactUs = () => {
  return (
    <div className="bg-white pb-5">
      <LayoutHeaders selectedBg={Top} />

      <ContactForm />

      <div className="container ">
        <div className="row justify-content-center mt-5">
          {contactInfo().map((contact) => (
            <FooterContact2
              key={contact.id}
              infoDetail={contact.detail}
              infoImage={contact.img}
              infoTitle={contact.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
