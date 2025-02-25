import React from "react";
// Boostrap and styling
import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Prime react
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

// Aos
import AOS from "aos";
import "aos/dist/aos.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import NoPage from "./Pages/NoPage";
import About from "./Pages/About";
import Tnc from "./Pages/Care/Tnc";
import ShippingPolicy from "./Pages/Care/ShippingPolicy";
import Returnpolicy from "./Pages/Care/ReturnPolicy";
import PrivacyPolicy from "./Pages/Care/PrivacyPolicy";
import ContactUs from "./Pages/Care/ContactUs";
import { useEffect } from "react";
import CustomizePage from "./Pages/Customize/CustomizePage";
import Configurator from "./Pages/Customize/Configurator/Configurator";
import ConfiguratorFootwear from "./Pages/Customize/Configurator/ConfiguratorFootwear";
import ConfiguratorMaleAccessories from "./Pages/Customize/Configurator/ConfiguratorMaleAccessories";
import ConfiguratorFemaleAccessories from "./Pages/Customize/Configurator/ConfiguratorFemaleAccessories";
import ConfiguratorFemale from "./Pages/Customize/Configurator/ConfiguratorFemale";
import ConfiguratorUnisex from "./Pages/Customize/Configurator/ConfiguratorUnisex";
import CustomizeCheckout from "./Pages/CustomizeCheckout";
import ConfiguratorWig from "./Pages/Customize/Configurator/ConfiguratorWig";
import ConfiguratorNails from "./Pages/Customize/Configurator/ConfiguratorNails";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePageTwo";
import AdminDashboard from "./Pages/Dashboard/admin/AdminHome";
import SignInAdmin from "./Pages/SignInAdmin";
import ConfiguratorSpecial from "./Pages/Customize/Configurator/ConfiguratorSpecial";
import ConfiguratorUnisexSpecial from "./Pages/Customize/Configurator/ConfiguratorUnisexSpecials";
import SashTemplatePage from "./Pages/Customize/extra-step-before-configurator/SashTemplate";
import ConfiguratorFeMaleVariation from "./Pages/Customize/Configurator/ConfiguratorFemaleVariation";
import ConfiguratorMaleVariation from "./Pages/Customize/Configurator/ConfiguratorMaleVariation";
import ShopPage from "./Pages/shop";
import ProductDetail from "./Pages/shop/product-detail";
import CategoryPage from "./Pages/shop/category-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);


  const queryClient = new QueryClient();


  return (
    <div className="allBg">
      <QueryClientProvider client={queryClient}>

        <BrowserRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="start-customize" element={<CustomizePage />} />
              <Route path="start-customize/sash-templates" element={<SashTemplatePage />} />
              <Route path="about" element={<About />} />
              <Route path="customize-checkout" element={<CustomizeCheckout />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="admin-signin" element={<SignInAdmin />} />
              <Route path="forgot-password" element={<ForgotPassword />} />

              <Route path="dashboard/:userID" element={<Dashboard />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />

              <Route path="/configurator/:Id" element={<Configurator />} />
              <Route path="/configurator-male-variant/:Id" element={<ConfiguratorMaleVariation />} />
              <Route path="/configurator-female-variant/:Id" element={<ConfiguratorFeMaleVariation />} />
              <Route path="/configurator-special/:Id" element={<ConfiguratorSpecial />} />
              <Route path="/configurator-sash-special/:Id" element={<ConfiguratorUnisexSpecial />} />
              <Route
                path="/configurator-female/:Id"
                element={<ConfiguratorFemale />}
              />
              <Route
                path="/configurator-footwear/:Id"
                element={<ConfiguratorFootwear />}
              />
              <Route
                path="/configurator-male-accessories/:Id"
                element={<ConfiguratorMaleAccessories />}
              />
              <Route
                path="/configurator-female-accessories/:Id"
                element={<ConfiguratorFemaleAccessories />}
              />
              <Route
                path="/configurator-unisex/:Id"
                element={<ConfiguratorUnisex />}
              />

              <Route path="/configurator-wig/:Id" element={<ConfiguratorWig />} />
              <Route
                path="/configurator-nails/:Id"
                element={<ConfiguratorNails />}
              />

              <Route path="tnc" element={<Tnc />} />
              <Route path="shippingPolicy" element={<ShippingPolicy />} />
              <Route path="returnPolicy" element={<Returnpolicy />} />
              <Route path="privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="contact" element={<ContactUs />} />

              {/* shop */}
              <Route path="shop" element={<ShopPage />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="category/:id" element={<CategoryPage />} />
              {/* <Route path="/category/:id" element={<ProductDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/confirm" element={<Reviews />} />
                <Route path="/checkout" element={<Checkout />} /> */}
        

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
