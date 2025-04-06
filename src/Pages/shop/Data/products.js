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
    children: ['T-Shirt'],
    grandparent: 'ready to wear',
  },
  {
    name: "Men's Clothing",
    image: 'https://example.com/mens-clothing.jpg',
    children: ['T-Shirt'],
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

export const divisionBreakdown = {
  'ready to wear': [
    "Men's Clothing",
    "Women's Clothing",
    'Accessories',
    'Unisex',
  ],
  'order to sew': ['Male', 'Female'],
};

export const categoriesBreakdown = {
  "Women's Clothing": ['T-Shirt', 'Trousers'],
  "Men's Clothing": ['T-Shirt', 'Trousers'],
  Unisex: ['T-Shirt', 'Trousers'],
  Accessories: ['Necklace', 'Bangles', 'Necklace & Bangles'],
  Male: [],
  Female: [
    'A-Line Dress',
    'Crop Top & Skirt',
    'Crop Top & Trousers',
    'Crop Top & Shorts',
    'General',
    'Maxi Dress',
    'Midi Dress',
    'Official',
  ],
};

export const color_variant_options = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Gray', value: '#808080' },
  { name: 'Brown', value: '#A52A2A' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Lavender', value: '#E6E6FA' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Indigo', value: '#4B0082' },
  { name: 'Teal', value: '#008080' },
  { name: 'Navy', value: '#000080' },
  { name: 'Olive', value: '#808000' },
  { name: 'Peach', value: '#FFDAB9' },
  { name: 'Violet', value: '#8A2BE2' },
  { name: 'Mint', value: '#98FF98' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Lime', value: '#00FF00' },
  { name: 'Slate', value: '#708090' },
  { name: 'Tan', value: '#D2B48C' },
  { name: 'Crimson', value: '#DC143C' },
];
