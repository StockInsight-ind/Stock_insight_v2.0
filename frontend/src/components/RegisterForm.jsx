// import { useState } from "react";
// import { registerUser } from "../api/userApi";

// export default function RegisterForm() {
// const [formData, setFormData] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     password:"",
//     confirmPassword:"",
//     market:"",
//     stocks:["","",""]
// });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {

//     if(formData.password !== formData.confirmPassword){

//       setMessage("Passwords do not match");
//       return false;
// }
//     if(!formData.market){

//       setMessage("Please select market");
//       return false;
// }

//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.password
//     ) {
//       setMessage("All fields are required");
//       return false;
//     }

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(formData.email)) {
//       setMessage("Invalid email");
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setMessage("Password must be at least 6 characters");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");

//     if (!validateForm()) return;

//     try {
//       setLoading(true);

//       const result = await registerUser(formData);

//       setMessage(result.message);

//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//         "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Account</h2>

//       <input
//         type="text"
//         name="firstName"
//         placeholder="First Name"
//         value={formData.firstName}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="lastName"
//         placeholder="Last Name"
//         value={formData.lastName}
//         onChange={handleChange}
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       />

//       <input
//  type="password"
//  placeholder="Confirm Password"
//  value={formData.confirmPassword}
//  onChange={(e)=>
//   setFormData({
//    ...formData,
//    confirmPassword:e.target.value
//   })
//  }
// />

//       <select
//       value={formData.market}
//       onChange={(e)=>
//         setFormData({
//         ...formData,
//         market:e.target.value
//         })
//       }
//       >
//       <option value="">Select Market</option>
//       <option value="India">India</option>
//       <option value="US">US</option>
//       <option value="Crypto">Crypto</option>
//       </select>

//       <input
//         placeholder="Favorite Stock 1"
//         value={formData.stocks[0]}
//         onChange={(e)=>{

//           const temp=[...formData.stocks];
//           temp[0]=e.target.value;

//           setFormData({
//           ...formData,
//           stocks:temp
//           });
//         }}
//         />

//     <input
//     placeholder="Favorite Stock 2"
//     value={formData.stocks[1]}
//     onChange={(e)=>{

//       const temp=[...formData.stocks];
//       temp[1]=e.target.value;

//       setFormData({
//       ...formData,
//       stocks:temp
//       });
//     }}
//     />

//     <input
//     placeholder="Favorite Stock 3"
//     value={formData.stocks[2]}
//     onChange={(e)=>{

//       const temp=[...formData.stocks];
//       temp[2]=e.target.value;

//       setFormData({
//       ...formData,
//       stocks:temp
//       });
//     }}
//     />

//       <button type="submit" disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>

//       {message && (
//         <p>{message}</p>
//       )}
//     </form>
//   );
// }


import { useState } from "react";
import { registerUser } from "../api/userApi";

export default function RegisterForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    market: "",
    stocks: ["", "", ""]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStockChange = (index, value) => {

    const updatedStocks = [...formData.stocks];

    updatedStocks[index] = value;

    setFormData({
      ...formData,
      stocks: updatedStocks
    });
  };

  const validateForm = () => {

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      setMessage("All fields are required");
      return false;
    }

    if (!formData.market) {

      setMessage("Please select market");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {

      setMessage("Invalid email address");
      return false;
    }

    if (formData.password.length < 6) {

      setMessage("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {

      setMessage("Passwords do not match");
      return false;
    }

    const selectedStocks =
      formData.stocks.filter(
        stock => stock.trim() !== ""
      );

    if (selectedStocks.length === 0) {

      setMessage(
        "Please enter at least one stock"
      );

      return false;
    }

    if (selectedStocks.length > 3) {

      setMessage(
        "Maximum 3 stocks allowed"
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    if (!validateForm()) return;

    try {

      setLoading(true);

      const payload = {

        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        market: formData.market,

        stocks:
          formData.stocks.filter(
            stock => stock.trim() !== ""
          )
      };

      const result =
        await registerUser(payload);

      setMessage(
        "Registration Successful"
      );

      console.log(result);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        market: "",
        stocks: ["", "", ""]
      });

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Create Account</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <select
        value={formData.market}
        onChange={(e) =>
          setFormData({
            ...formData,
            market: e.target.value
          })
        }
      >
        <option value="">
          Select Market
        </option>

        <option value="India">
          India
        </option>

        <option value="US">
          US
        </option>

        <option value="Crypto">
          Crypto
        </option>
      </select>

      <input
        type="text"
        placeholder="Favorite Stock 1"
        value={formData.stocks[0]}
        onChange={(e) =>
          handleStockChange(
            0,
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Favorite Stock 2"
        value={formData.stocks[1]}
        onChange={(e) =>
          handleStockChange(
            1,
            e.target.value
          )
        }
      />

      <input
        type="text"
        placeholder="Favorite Stock 3"
        value={formData.stocks[2]}
        onChange={(e) =>
          handleStockChange(
            2,
            e.target.value
          )
        }
      />

      <button
        type="submit"
        disabled={loading}
      >
        {
          loading
            ? "Registering..."
            : "Register"
        }
      </button>

      {
        message &&
        <p>{message}</p>
      }

    </form>
  );
}
