import {
  createSlice,
  configureStore,
  createAsyncThunk,
  combineReducers,
  // createAsyncThunk,
} from "@reduxjs/toolkit";

import ProductsDataService from "../Services/products.services";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async (_, { dispatch }) => {
    try {
      const querySnapshot = await ProductsDataService.getAllProducts();
      const products = [];

      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      dispatch(addProducts(products));
    } catch (error) {
      throw error; // Rethrow the error for error handling in components
    }
  }
);

export const fetchAllModels = createAsyncThunk(
  "allModels/fetchAllModels",
  async (_, { dispatch }) => {
    try {
      const querySnapshot = await ProductsDataService.getAllModels();
      const models = [];

      querySnapshot.forEach((doc) => {
        models.push({ id: doc.id, ...doc.data() });
      });

      dispatch(addModels(models));
    } catch (error) {
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
        const filtered = state.products.filter(
          (product) =>
            product.title && product.title.toLowerCase().includes(searchTerm) // Convert product title to lowercase
        );

        state.searchedArray = filtered;
      }
    },
  },
});

const allModelsSlice = createSlice({
  name: "allModels",
  initialState: {
    products: [],
    // searchedArray: [],
    // searchKeyDisplay: "",
  },
  reducers: {
    addModels: (state, action) => {
      state.products = action.payload;
    },
  },
});

const currencySymbolSlice = createSlice({
  name: "currencySymbol",
  initialState: { symbol: "$", factor: 0.088 }, // Default currency symbol and factor
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
    dashboardPath: "",
    currentUser: null, // Change this to null if it's a single object, or keep it as an array if it's meant to be an array of users.
  },
  reducers: {
    setcurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateOrders: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        orders: action.payload,
      };
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },
    setDashBoardPath: (state, action) => {
      state.dashboardPath = action.payload;
    },
  },
});

const customized3DSlice = createSlice({
  name: "customizedProduct",
  initialState: {
    itemDetails: [],
    itemDataSheet: "",
  },
  reducers: {
    set3DItemDetails: (state, action) => {
      state.itemDetails = action.payload;
    },
    setItemDataSheet: (state, action) => {
      state.itemDataSheet = action.payload;
    },
    clear3DInfo: (state) => {
      state.itemDetails = [];
      state.itemDataSheet = ""
    }
  },
});



const rootReducer = combineReducers({
  allProducts: allProductsSlice.reducer,
  allModels: allModelsSlice.reducer,
  cartItems: cartSlice.reducer,
  user: userSlice.reducer,
  currencySymbol: currencySymbolSlice.reducer,
  customizedProduct: customized3DSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store configuration
const store = configureStore({
  reducer: persistedReducer,
});

export const { addProducts, searchItem } = allProductsSlice.actions;
export const {addModels } = allModelsSlice.actions;
export const { setCurrencySymbol } = currencySymbolSlice.actions;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { setSignedIn, setcurrentUser, setDashBoardPath, updateOrders } = userSlice.actions;
export const {set3DItemDetails, setItemDataSheet, clear3DInfo} = customized3DSlice.actions;

export const persistor = persistStore(store);
export default store;
