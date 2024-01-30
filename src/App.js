import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KnowYourClient from "./pages/KnowYourClient";
import { LoginContext } from "./contexts/LoginContext";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./components/ProductDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useQueryClient } from '@tanstack/react-query';
import AddProduct from "./components/AddProduct";
import Home from "./pages/Home";
import LandingPage from "./components/LandingPage";
import Landing from "./components/Landing";

function App() {
  const [loginSuccess, setLoginSuccess] = useState()
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState()
  const [ipAddress, setIpAddress] = useState()
  const [loginAuth, setLoginAuth] = useState()
  const [isBusiness, setIsBusiness] = useState(false)
  const [kycVerified, setKycVerified] = useState(false)
  const [products, setProducts] = useState([])
  const [productCategory, setProductCategory] = useState('')
  const [items, setItems] = useState([])
  const [count, setCount] = useState(1)
  const [buttonClick, setButtonClick] = useState()
  const [filteredProduct, setFilteredProduct] = useState(null)
  const queryClient = useQueryClient()
  // const allProducts = queryClient.getQueryData(['All_Afro_Products'])
  const allProducts = JSON.parse(localStorage.getItem('My_Afro_Products'))
  const myItems = allProducts ? allProducts : products


  useEffect(()=>{
    // setItems(JSON.parse(window.localStorage.getItem('Afro_Products')))
    console.log('This is cached prod: ', allProducts)
    
  }, [])
  // const allProds = JSON.parse(window.localStorage.getItem('My_Afro_Products'))
  

  const values = {filteredProduct, setFilteredProduct, registerSuccess, productCategory, setProductCategory, buttonClick, setButtonClick, count, setCount, setRegisterSuccess, setKycVerified, kycVerified, isBusiness, setIsBusiness, setUserEmail, products, setProducts, setItems, items, userEmail, ipAddress, setIpAddress, loginAuth, setLoginAuth}
  return (
    <Router >
      <div className="font-lato">
        <LoginContext.Provider value={values}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/kyc" element={<KnowYourClient />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {myItems?.map((product, index) => {return <Route key={index} path={`/dashboard/product/${product.productId}`} element={<ProductDetails product={product} />} />})}
            {myItems?.map((product, index) => {return <Route key={index} path={`/product/${product.productId}`} element={<ProductDetails product={product} />} />})}
          </Routes>
        </LoginContext.Provider>
      </div>
    </Router>
    
  );
}

export default App;
