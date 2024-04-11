import { useState } from "react";
import { toast } from 'react-toast'
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { createUserAccount } from "../backend/api";
import { useStateValues } from "../Utils/Provider";
import { passwordStrength } from 'check-password-strength'

const SignupForm = () => {

  const [{ abc }, dispatch] = useStateValues();
  if (abc) { }
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })


  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(passwordStrength(formData.password).value !== "Strong")
    {
      toast("Weak Password");
      setLoading(false);
      return;
    }
    try {
      const newUser = await createUserAccount(formData);
   
      if (!newUser) {
        toast("Sign up failed. Please try again.");
        return;
      }

      dispatch({
        type: "SET_USER",
        user: newUser,
      })
      localStorage.setItem('user',newUser);
      navigate('/');
      setLoading(false);


    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className="w-[100vw] flex items-center  h-screen bg-[#000000] text-white">
      <div>
        <img className="h-[30rem] ml-4 rounded-md w-[50vw] hidden lg:block"
          alt="" src="https://img.freepik.com/free-photo/composition-social-media-app-with-smartphone-friends_23-2150847887.jpg?w=740&t=st=1711899372~exp=1711899972~hmac=1dd9062fdf71380f42407cd5de3f89d37523aa76eb569a9c2c82575c78027eff"
        ></img>
      </div>
      <div className="w-[20rem]  h-[100vh]  mx-auto flex justify-center items-center flex-col">
        <div className="flex items-center font-bold gap-5">  <img className="h-[3rem] w-[3rem]"
          src="https://ideogram.ai/api/images/direct/xNvemxYrRMeNtIv-_V4MsQ.png" alt="logo" />
          <p>ChitChat</p>
        </div>
        <h2 className="semibold md:bold pt-2 ">
          Create a new account
        </h2>
        <p className="text-[#7878A3]  md:base-regular ">
          To use ChitChat, Please enter your details
        </p>

        <form
          onSubmit={handleSignup}
          className="flex flex-col  items-center w-full mt-2">

          <div className="flex flex-col relative gap-2  ">
            <label className="text-white">Name :</label>
            <input
              type="text"
              className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
              name="name"
              onChange={changeHandler}
              value={formData.name}
            />
          </div>

          <div className="flex flex-col relative gap-2 mt-3 ">
            <label className="text-white">Username :</label>
            <input
              type="text"
              className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
              name="username"
              onChange={changeHandler}
              value={formData.username}
            />
          </div>

          <div className="flex flex-col relative gap-2 mt-3 ">
            <label className="text-white">Email :</label>
            <input
              type="email"
              className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
              name="email"
              onChange={changeHandler}
              value={formData.email}
            />
          </div>

          <div className="flex flex-col relative gap-2 mt-3 ">
            <label className="text-white">Password :</label>
            <input
              type={show ? " text" : "password"}
              className="h-[2.4rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
              name="password"
              onChange={changeHandler}
              value={formData.password}
            />
            <div className="absolute right-4 bottom-3">
              {show ?
                (<TbEyeClosed onClick={() => { setShow(!show) }} />) :
                (<FaEye onClick={() => { setShow(!show) }} />)
              }
            </div>
          </div>

          <button type="submit" className="bg-purple-800 mt-5  w-[6rem] rounded-lg py-2 mx-auto hover:bg-[#877EFF] text-[#FFFFFF]">
            {Loading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-sm text-[#EFEFEF] text-center mt-2">
            Already have an account?
            <Link
              to="/login"
              className="text-[#877EFF] text-sm font-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
