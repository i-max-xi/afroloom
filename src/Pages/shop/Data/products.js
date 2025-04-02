import { useEffect, useState } from 'react';
import AllServices from '../../../Services/usersService';

export const LoomStoreProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await AllServices.getAllProducts();
        setProducts(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return products;
};

export const categories = [
  {
    name: "Women's Clothing",
    image: 'https://example.com/womens-clothing.jpg',
    children: ['T-Shirt', 'Kaftan'],
    grandparent: 'ready to wear',
  },
  {
    name: "Men's Clothing",
    image: 'https://example.com/mens-clothing.jpg',
    children: ['T-Shirt', 'Kaftan'],
    grandparent: 'ready to wear',
  },
  {
    name: 'Unisex',
    image: 'https://example.com/mens-clothing.jpg',
    children: ['T-Shirt'],
    grandparent: 'ready to wear',
  },
  {
    name: 'Accessories',
    image: 'https://example.com/mens-clothing.jpg',
    children: ['Necklace', 'Bangles', 'Necklace & Bangles'],
    grandparent: 'ready to wear',
  },
  // {
  //   name: 'Style & Sew',
  //   image: 'https://example.com/mens-clothing.jpg',
  //   children: ['Male', 'Female'],
  //   grandparent: 'order to sew',
  // },
  {
    name: 'Male',
    image: 'https://example.com/mens-clothing.jpg',
    children: [],
    grandparent: 'order to sew',
  },
  {
    name: 'Female',
    image: 'https://example.com/mens-clothing.jpg',
    children: [
      'A-Line Dress',
      'Crop Top & Skirt',
      'Crop Top & Trousers',
      'Crop Top & Shorts',
      'General',
      'Maxi Dress',
      'Midi Dress',
      'Official',
    ],
    grandparent: 'order to sew',
  },
];

export const categoriesBreakdown = {
  "Women's Clothing": ['T-Shirt', 'Kaftan', 'Trousers'],
  "Men's Clothing": ['T-Shirt', 'Kaftan', 'Trousers'],
  Unisex: ['T-Shirt', 'Trousers'],
  Accessories: ['Necklace', 'Bangles', 'Necklace & Bangles'],
  'Style & Sew': ['Male ', 'Female'],
};
