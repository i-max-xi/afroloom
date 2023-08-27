import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

import thunk from "redux-thunk"; // Import redux-thunk
import { db } from "../firebase";

// Redux slice for allProducts


/* const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {
    addProducts: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
   
  },
}); */

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    searchTerm: "",
    // visible: false,
    filteredItems: [], // Initialize an empty array to store filtered products
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      // state.searchTerm = action.payload;
      // Filter products based on the search term
      state.filteredItems = state.searchTerm
        ? state.products.filter(product =>
            product.name.toLowerCase().includes(action.payload.toLowerCase())
          )
        : [];
    },
    // ... other reducers
  },
});


const currencySymbolSlice = createSlice({
  name: "currencySymbol",
  initialState: { symbol: "$", factor: 1 }, // Default currency symbol and factor
  reducers: {
    setCurrencySymbol: (state, action) => {
      state.symbol = action.payload.symbol;
      state.factor = action.payload.factor;
    },
  },
});

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "allProducts/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "AllProducts"));
    const products = querySnapshot.docs.map((doc) => doc.data());
    return products;
  }
);

// const searchSlice = createSlice({
//   name: "search",
//   initialState: {
//     filteredItems: [],
//     visible: false,
//   },
//   reducers: {
    
//     setVisible: (state, action) => {
//       state.visible = action.payload;
//     },
//     setFilteredItems: (state, action) => {
//       state.filteredItems = action.payload;
//     },
//   },
// });

/*const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    filteredItems: [], // Initialize an empty array to store filtered products
    visible: false,
  },
  reducers: {
    setSearchProduct: (state, action) => {
      state.searchTerm = action.payload;
      // Filter products based on the search term
      state.filteredItems = state.searchTerm
        ? state.allProducts.filter(product =>
            product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : [];
    },
    // other reducers
  },
});*/


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      return [];
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    signedIn: false,
    currentUser: [],
  },
  reducers: {
    setcurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },
  },
});

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState: null,
  reducers: {
    setShippingAddress: (state, action) => {
      return action.payload;
    },
  },
});

const emailAddressSlice = createSlice({
  name: "emailAddress",
  initialState: null,
  reducers: {
    setEmailAddress: (state, action) => {
      return action.payload;
    },
  },
});

const firstNameSlice = createSlice({
  name: "firstName",
  initialState: null,
  reducers: {
    setFirstName: (state, action) => {
      return action.payload;
    },
  },
});

const lastNameSlice = createSlice({
  name: "lastName",
  initialState: null,
  reducers: {
    setLastName: (state, action) => {
      return action.payload;
    },
  },
});

const citySlice = createSlice({
  name: "city",
  initialState: null,
  reducers: {
    setCity: (state, action) => {
      return action.payload;
    },
  },
});

const apartmentSlice = createSlice({
  name: "apartment",
  initialState: null,
  reducers: {
    setApartment: (state, action) => {
      return action.payload;
    },
  },
});

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState: null,
  reducers: {
    setPaymentMethod: (state, action) => {
      return action.payload;
    },
  },
});

// Redux store configuration
const store = configureStore({
  reducer: {
    allProducts: allProductsSlice.reducer,
    cartItems: cartSlice.reducer,
    shippingAddress: shippingAddressSlice.reducer,
    emailAddress: emailAddressSlice.reducer,
    firstName: firstNameSlice.reducer,
    lastName: lastNameSlice.reducer,
    city: citySlice.reducer,
    apartment: apartmentSlice.reducer,
    paymentMethod: paymentMethodSlice.reducer,
    user: userSlice.reducer,
    currencySymbol: currencySymbolSlice.reducer,
  },
  middleware: [thunk],
});

export const { addProducts, setSearchTerm  } = allProductsSlice.actions;
export const { setCurrencySymbol } = currencySymbolSlice.actions;

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { setShippingAddress } = shippingAddressSlice.actions;
export const { setEmailAddress } = emailAddressSlice.actions;
export const { setFirstName } = firstNameSlice.actions;
export const { setLastName } = lastNameSlice.actions;
export const { setCity } = citySlice.actions;
export const { setApartment } = apartmentSlice.actions;
export const { setPaymentMethod } = paymentMethodSlice.actions;
export const { setSignedIn, setcurrentUser } = userSlice.actions;
// export const { setQuery, setFilteredItems, setVisible } = searchSlice.actions;



export default store;
