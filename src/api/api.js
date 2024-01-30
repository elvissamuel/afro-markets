import axios from "axios";
import { decryptData, decryptAES } from "../AES/AES";



export const registerEmail = (obj, toast, setLoading) => {
  setLoading(true)
  axios
    .post(
      process.env.REACT_APP_AFROMARKETS_URL + "/user/subscribe",
      obj,
    )
    .then((response) => {
      if (response.status === 200) {
      toast.success('Registration was successful')
        console.log("Response:", response.data);
      }
    })
    .catch((error) => {
      // Handle error
      toast.error('Registration was failed!')
      console.error("Error:", error);
    }).finally(()=>{
      setLoading(false)
    })
};

export const getIPAddress = (setIpAddress)=>{
  fetch('https://api.ipify.org/?format=json')
  .then(results => results.json())
  .then(data => {
     const myIp = data.ip
     setIpAddress(myIp)
     window.localStorage.setItem('ip_address', JSON.stringify(myIp))
    });

}

export const registerUser = (data, setLoading, reset, navigate, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/user/onboarding", data, {headers}
    )
  .then((res) =>{

    if(!res.ok){
      console.log('500: ', res.json)
    }
    if(res){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      if(res.status === 200) {
      toast.success('Registration was successful, check your email for verification code')
        reset()
        setTimeout(() => {
          navigate('/verify')
        }, 3000);
      }

    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    const myData = decryptAES(err.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('err res: ', response)
      if(response.message.includes('Email exists')) {
      toast.error('Email exists, login in to your account')

      } else{
        console.log('user-form-err: ', err)
        toast.error('Registration was unsuccessful, try again!')
      }

    }).catch((err) => {console.log('real err: ', err)})
    
  }).finally(()=>{
    setLoading(false)
  })
}

export const handlePasswordReset = (data, setLoading, reset, navigate, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  setLoading(true)
  axios.post("https://afromarketsquare-0170213566bc.herokuapp.com/user/resetPassword", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('dres-auth:', response )
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        toast.success('You have successfully reset your password')
        reset()
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error('Password reset failed!')
  }).finally(()=>{
    setLoading(false)
  })
}

export const handleLogin = (data, setLoading, reset, navigate, setLoginAuth, setIsBusiness, setKycVerified, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  setLoading(true)
  axios.post("https://afromarketsquare-0170213566bc.herokuapp.com/user/login", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      const cart = response.responseBody.cartResponse
      console.log('dres-auth:', response )
      setLoginAuth(response.responseBody.authorization)
      setIsBusiness(response.responseBody.isBusiness)
      setKycVerified(response.responseBody.kycVerified)
      localStorage.setItem('Afro_Login_Response', JSON.stringify(response))
      localStorage.setItem('Afro_Cart', JSON.stringify(response.responseBody.cartResponse))
      localStorage.setItem('My_Login_Auth', JSON.stringify(response.responseBody.authorization))
      // localStorage.setItem('Afro_Cart_Response', JSON.stringify(response.responseBody.cartResponse))
      console.log('cart res: ', response.responseBody.cartResponse.orders)
      if (Object.keys(cart).length >= 1){
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.cartResponse.orders))
    }
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        toast.success('Login was successful')
        reset()
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error('Login failed!')
  }).finally(()=>{
    setLoading(false)
  })
}

export const handleEmailVerification = (data, setLoading, navigate, toast, location) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/user/verifyEmail", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('Derypted response veri: ', response.responseBody)
      window.localStorage.setItem('Afro_User_Email', response.responseBody.email)
      window.localStorage.setItem('Afro_User_Name', response.responseBody.fullName)
      window.localStorage.setItem('Afro_isBusiness', response.responseBody.isBusiness)
      if(res.status === 200) {
        toast.success('Email verified successfully')
        setTimeout(() => {
          if(location.pathname === '/verify-email'){
          navigate('/reset-password')
          } else {
            navigate('/login')
          }
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error('Email verification failed')
  }).finally(()=>{
    setLoading(false)
  })
}

export const handleResetPassword = (data, setLoading, navigate, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/user/requestVerification", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('Derypted response veri: ', response.responseBody)
      if(res.status === 200) {
        toast.success('Token has been sent to your email')
        setTimeout(() => {
          navigate('/verify-email')
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error('Verification request failed!')
  }).finally(()=>{
    setLoading(false)
  })
}

export const registerBusiness = (data, setLoading, reset, navigate, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/merchant/onboarding", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('Full res: ', res)
      console.log('bus reg: ', response)
      if(res.status === 200) {
        toast.success('Registration was successful, check your email for verification code')
        reset()
        setTimeout(() => {
          navigate('/verify')
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    const myData = decryptAES(err.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      if(response.message.includes('Email exists')) {
      toast.error('Email exists, login in to your account')

      } else{
        console.log('user-form-err: ', err)
        toast.error('Registration was unsuccessful, try again!')
      }

    }).catch((err) => {console.log('real err: ', err)})
  }).finally(()=>{
    setLoading(false)
  })
}

export const getAllProducts = (data) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  // setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/product/fetchAllProducts", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
    // window.localStorage.setItem('Afro_All_Products', response.responseBody)
      // setProducts(response.responseBody)
      return response.responseBody
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    
  }).finally(()=>{
    // setLoading(false)
  })
}

export const getAllBuisnessProducts = async (data) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      console.log('This is all items from api: ', myData)
      const parsedData = JSON.parse(myData);
      console.log('Decrypted Data:', parsedData.responseBody);
      window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
      window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
}

export const getAllItems = async (data) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      // console.log('This is all items from api: ', myData)
      const parsedData = JSON.parse(myData);
      console.log('Decrypted Data:', parsedData.responseBody);
      window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
      window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};

export const searchProduct = async (data) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData);
      console.log('This is filtered item from api: ', parsedData)
      console.log('Decrypted Data:', parsedData.responseBody);
      window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
      window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};

export const createCart = (data, setLoading, toast, setCount) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/cart/createCart", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('bus reg: ', response)
      setCount(1)
      localStorage.setItem('Afro_Cart_Reference', JSON.stringify(response.responseBody.cartReference))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      if(res.status === 200) {
        toast.success('Cart created and item added successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error("Couldn't create or add product to cart")
  }).finally(()=>{
    setLoading(false)
  })
}

export const addToCart = (data, setLoading, toast, setCount) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/cart/addItemToCart", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('bus reg: ', response)
      setCount(1)
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Reference', JSON.stringify(response.responseBody.cartReference))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      if(res.status === 200) {
        toast.success('Product added to cart successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error("Couldn't add product to cart")
  }).finally(()=>{
    setLoading(false)
  })
}

export const removeFromCart = (data, setLoading, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/cart/removeItemFromCart", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('bus reg: ', response)
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      if(res.status === 200) {
        toast.success('Product removed successfully', {
          duration: 1000
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error("Couldn't remove product from cart")
  }).finally(()=>{
    setLoading(false)
  })
}

export const getAllOrders = async (data) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/fetchUserCart", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData);
      // console.log('Decrypted Data:', parsedData.responseBody);
      window.localStorage.setItem('My_Afro_Orders', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody.orders; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};

export const getImageUrl = (files, setImgUrl, setLoading)=>{
  setLoading(true)
  axios
  .post("https://api.cloudinary.com/v1_1/dws9ykgky/image/upload", files)
  .then((response)=> {
    console.log('img res: ', response)
    const postUrl = response.data.url
    // localStorage.setItem('Afro_Product_Image', response.data.url)
    setImgUrl(postUrl)
  }).catch((err) => {
    console.log('fetch-img-err: ', err)
  }).finally(()=>{
    setLoading(false)
  })
}

export const createNewProduct = (data, setLoading, toast) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  // setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/product/listProduct", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      console.log('new product details: ', response)
      if(res.status === 200) {
        toast.success('Product created successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error("Couldn't add product to cart")
  }).finally(()=>{
    // setLoading(false)
  })
}

export const getCategories = (setCategories) => {
  axios.get('https://afromarketsquare-0170213566bc.herokuapp.com/app/categories')
            .then((res) => {
              console.log('cat log:', res)
              if(res.data){
                const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
                  const response = JSON.parse(myres)
                  console.log('categories: ', response)
                  setCategories(response)
                  // localStorage.setItem('Afro_Product_Categories', JSON.stringify(response))
                  return response
                  
                }).catch((err) => {console.log('real err: ', err)})
                console.log('Decrpyted cart res: ', myData)
                }
                // Handle the successful response here
            })
            .catch(function (error) {
                // Handle errors here
                console.error('Error:', error);
            });
}

export const handleCheckout = (data, setLoading, toast, navigate) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL+"/order/checkout", data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres)
      const checkoutUrl = response.responseBody.stripeResponse
      console.log('checkout res: ', response)
      
      if(res.status === 200) {
        toast.success('Checkout successful', {
          duration: 1000
        })
        setTimeout(() => {
          // navigate(checkoutUrl)
          window.location.href = checkoutUrl
        }, 1000);
        
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    toast.error("Checkout unsuccessful")
  }).finally(()=>{
    setLoading(false)
  })
}


