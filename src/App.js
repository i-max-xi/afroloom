import React from 'react';
// Boostrap and styling
import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Prime react
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";  

// Aos
import AOS from 'aos';
import 'aos/dist/aos.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout';
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
// import SignUp from './Pages/User/SignUp';
import SignIn from './Pages/User/SignIn';
import About from './Pages/About';
import Register from './Pages/User/Register';
import ForgotPassword from './Pages/User/ForgotPassword';
import Artisan from './Pages/Artisan';
import Checkout from './Pages/Checkout';
import Tnc from './Pages/Care/Tnc';
import ShippingPolicy from './Pages/Care/ShippingPolicy';
import Returnpolicy from './Pages/Care/ReturnPolicy';
import PrivacyPolicy from './Pages/Care/PrivacyPolicy';
import ContactUs from './Pages/Care/ContactUs';
import ItemDetail from './Pages/ItemDetail';
import CategoryPage from './Pages/CategoryPage';
import CategoryDetail from './Pages/CategoryDetail';
import ArtisanDetail from './Pages/ArtisanDetail';
import { useEffect } from 'react';
import CustomizePage from './Pages/Customize/CustomizePage';
import SellerDashboard from './Pages/Dashboards/SellerDashboard';
import UserDashboard from './Pages/Dashboards/UserDashboard';
import CustomizeFemale from './Pages/Customize/CustomizeFemale';
import CustomizeMale from './Pages/Customize/CustomizeMale';
import CustomizeMaleAccesories from './Pages/Customize/CustomizeMaleAccesories';
import CustomizeFemaleAccesories from './Pages/Customize/CustomizeFemaleAccessories';
import CustomizeUnisex from './Pages/Customize/CustomizeUnisex';
import CustomizeFootwear from './Pages/Customize/CustomizeFootwear';
import Dashboard from './Pages/Dashboards/Dashboard';
import RegisterAs from './Pages/User/RegisterAs';
import Buyer from './Pages/User/Buyer';
import Supplier from './Pages/User/Supplier';
import Configurator from './Pages/Customize/Configurator/Configurator'

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          {/* <Route path="signup" element={<SignUp />} /> */}
          <Route path="signin" element={<SignIn />} />
          <Route path='register' element={<Register />} />
          <Route path='registeras' element={<RegisterAs />} />
          <Route path='buyer-signup' element={<Buyer />} />
          <Route path='supplier-signup' element={<Supplier />} />

          <Route path='artisan' element={<Artisan />} />


          <Route path='checkout' element={<Checkout />} />
          <Route path='category-page' element={<CategoryPage  />} />
          <Route path='customize' element={<CustomizePage  />} />

          <Route path='forgotPassword' element={<ForgotPassword />} />
          <Route path='/seller-dashboard' element={<SellerDashboard />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />



          <Route path='category/:categoryName' element={<CategoryDetail />} />
          <Route path="/product/:productId" element={<ItemDetail />} />
          <Route path="/artisan/:artisanId" element={<ArtisanDetail />} />
          <Route path="/customize-male/:customizeId" element={<CustomizeMale />} />
          <Route path="/customize-female/:Id" element={<CustomizeFemale />} />
          <Route path="/customize-male-accessories/:Id" element={<CustomizeMaleAccesories />} />
          <Route path="/customize-female-accessories/:Id" element={<CustomizeFemaleAccesories />} />
          <Route path="/customize-unisex/:Id" element={<CustomizeUnisex />} />
          <Route path="/customize-footwear/:Id" element={<CustomizeFootwear />} />
          <Route path="/configurator" element={<Configurator />} />




          <Route path='tnc' element={<Tnc />} />
          <Route path='shippingPolicy' element={<ShippingPolicy />} />
          <Route path='returnPolicy' element={<Returnpolicy />} />
          <Route path='privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='contact' element={<ContactUs />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

     
    </div>
  );
}

export default App;
