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

function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="allBg">
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CustomizePage />} />
            <Route path="about" element={<About />} />
            <Route path="customize-checkout" element={<CustomizeCheckout />} />

            <Route path="/configurator/:Id" element={<Configurator />} />
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

            <Route path="tnc" element={<Tnc />} />
            <Route path="shippingPolicy" element={<ShippingPolicy />} />
            <Route path="returnPolicy" element={<Returnpolicy />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="contact" element={<ContactUs />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
