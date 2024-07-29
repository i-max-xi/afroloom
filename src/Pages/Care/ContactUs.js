import React from "react";
import { FooterContact2 } from '../../Components/FooterContact'
import ContactForm from '../../Components/ContactForm'
import contactInfo from "../../Data/contactList";
import Top from "../../Assets/Headers/contactus.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";


const ContactUs = () => {
  return (
    <div className="bg-white">
      
    <LayoutHeaders selectedBg={Top}/>


      <ContactForm />

      <div className="container mb-5">
        <div className="row justify-content-center mt-5">
          {contactInfo.map((contact) => (
            <FooterContact2
              key={contact.id}
              infoDetail={contact.detail}
              infoDetail2={contact.detail2}
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
