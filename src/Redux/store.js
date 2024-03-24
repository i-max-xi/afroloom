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

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addItem: (state, action) => {
//       state.push(action.payload);
//     },
//     removeItem: (state, action) => {
//       return state.filter((item) => item.id !== action.payload.id);
//     },
//     clearCart: (state) => {
//       return [];
//     },
//   },
// });

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
      state.itemDataSheet = "";
    },
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  currencySymbol: currencySymbolSlice.reducer,
  customizedProduct: customized3DSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store configuration
const store = configureStore({
  reducer: persistedReducer,
});

export const { setCurrencySymbol } = currencySymbolSlice.actions;
// export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const {
  setSignedIn,
  setcurrentUser,
  setDashBoardPath,
  updateOrders,
  updateCurrentUser,
} = userSlice.actions;
export const { set3DItemDetails, setItemDataSheet, clear3DInfo } =
  customized3DSlice.actions;

export const persistor = persistStore(store);
export default store;
