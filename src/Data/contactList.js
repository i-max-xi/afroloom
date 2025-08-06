import React, { useEffect, useState } from 'react';
import AllServices from '../Services/usersService'; // Make sure the path is correct

const ContactInfo = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await AllServices.getAllcontactDetails();
        setContacts(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const contact = [
    {
      id: 1,
      title: 'Find Us',
      detail: contacts[0]?.location || [],
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="35"
          // height="35"
          fill="currentColor"
          className="bi bi-geo-alt-fill text-warning"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Call Us',
      detail: ['(+233) 25 689 4048'],
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="35"
          // height="35"
          fill="currentColor"
          className="bi bi-telephone-fill text-warning"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Email Us',
      detail: ['info@afroloom.com'],
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="35"
          // height="35"
          fill="currentColor"
          className="bi bi-envelope-open text-warning"
          viewBox="0 0 16 16"
        >
          <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
        </svg>
      ),
    },
  ];

  return contact;
};

export default ContactInfo;
