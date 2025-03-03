import {
  createSlice,
  configureStore,
  combineReducers,
  // createAsyncThunk,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const currencySymbolSlice = createSlice({
  name: "currencySymbol",
  initialState: { symbol: "₵", factor: 1 }, // Default currency symbol and factor
  reducers: {
    setCurrencySymbol: (state, action) => {
      state.symbol = action.payload.symbol;
      state.factor = action.payload.factor;
    },
  },
});



const userSlice = createSlice({
  name: "user",
  initialState: {
    signedIn: false,
    dashboardPath: "",
    currentUser: null,
  },
  reducers: {
    setcurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
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
  },
  reducers: {
    addToCart: (state, action) => {
      state.itemDetails.push(action.payload);
    },

    clearCart: (state) => {
      state.itemDetails = [];
    },

    removeFromCart: (state, action) => {
      state.itemDetails = state.itemDetails.filter(
        (item) => item.name !== action.payload,
      );
    },

    updateCustomzedItemQuantity: (state, action) => {
      // const { id, selectedSize, quantity } = action.payload;
      // const item = state.find((item) => item.id === id && item.selectedSize === selectedSize);
      // if (item) {
      //   item.quantity = quantity;
      // }
    },
  },
});



const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: [],
  reducers: {
    addToShopCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },

    removeFromShopCart: (state, action) => {
      return state.filter(
        (item) => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
      );
    },

    updateShopItemQuantity: (state, action) => {
      const { id, selectedSize, quantity } = action.payload;
      const item = state.find((item) => item.id === id && item.selectedSize === selectedSize);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearShopCart: () => [],
    // clearShopCart: (state) => {
    //   state = [];
    // },
  },
});



const rootReducer = combineReducers({
  user: userSlice.reducer,
  currencySymbol: currencySymbolSlice.reducer,
  customizedProduct: customized3DSlice.reducer,
  shopCart: shopCartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store configuration
const store = configureStore({
  reducer: persistedReducer,
});

export const { setCurrencySymbol } = currencySymbolSlice.actions;

export const {
  setSignedIn,
  setcurrentUser,
  setDashBoardPath,
  updateOrders,
  updateCurrentUser,
} = userSlice.actions;

export const { addToCart, clearCart, removeFromCart, updateCustomzedItemQuantity } =
  customized3DSlice.actions;

export const { addToShopCart, removeFromShopCart, updateShopItemQuantity, clearShopCart } = shopCartSlice.actions;


export const persistor = persistStore(store);
export default store;
