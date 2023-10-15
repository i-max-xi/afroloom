import {
  createSlice,
  configureStore,
  createAsyncThunk,
  // createAsyncThunk,
} from "@reduxjs/toolkit";
 
import ProductsDataService from '../Services/products.services';

export const fetchAllProducts = createAsyncThunk(
  'allProducts/fetchAllProducts',
  async (_, { dispatch }) => {
    try {
      const querySnapshot = await ProductsDataService.getAllProducts();
      const products = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      // Dispatch the products to set the initial state of allProducts
      dispatch(addProducts(products));
    } catch (error) {
      // Handle any potential errors (e.g., network issues, etc.)
      throw error; // Rethrow the error for error handling in components
    }
  }
);

// Redux slice for allProducts


const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    searchedArray: [],
    searchKeyDisplay: "",
  },
  reducers: {
    addProducts: (state, action) => {
      
      state.products = action.payload;
    },
    
    searchItem: (state, action) => {
      const searchTerm = action.payload.toLowerCase(); // Convert search term to lowercase
      state.searchKeyDisplay = action.payload;
      
      if (searchTerm !== "") {
        const filtered = state.products.filter(product =>
          product.title && product.title.toLowerCase().includes(searchTerm) // Convert product title to lowercase
        );
        
        state.searchedArray = filtered;
      } 
      // else {
      //   state.searchedArray = state.buffer;
      // }
    }
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
});

export const { addProducts, searchItem  } = allProductsSlice.actions;
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
