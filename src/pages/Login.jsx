import { useState } from "react";
import { toast } from 'react-toast'
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { getCurrentUser, signInAccount } from "../backend/api";
import { useStateValues } from "../Utils/Provider";


const Login = () => {
  const [{ abc }, dispatch] = useStateValues();
  if (abc) { }
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const session = await signInAccount(formData);
    if (!session) {
      toast("Login failed. Please try again.");
      return;
    }
   
    const newUSer =await getCurrentUser();
  
    dispatch({
      type: "SET_USER",
      user: newUSer,
    })
    localStorage.setItem('user',JSON.stringify(newUSer));
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="w-[100vw] flex items-center  h-screen bg-[#000000] text-white">
      <div className=" w-[18rem]  h-[100vh] gap-3 mx-auto flex justify-center items-center flex-col">
        <div className="flex items-center font-bold gap-5">  <img className="h-[3rem] w-[3rem]"
          src="https://ideogram.ai/api/images/direct/xNvemxYrRMeNtIv-_V4MsQ.png" alt="logo" />
          <p>ChitChat</p>
        </div>
        <h2 className="font-semibold md:font-bold ">
          Log in to your account
        </h2>
        <p className="text-[#7878A3]  mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4 w-full mt-4">
          <div className="flex flex-col gap-3 ">
            <label className="text-white">Email :</label>
            <input
              type=""
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
              className="h-[2.5rem] w-[15rem] px-3 rounded-lg bg-[#1F1F22] border-none  focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#5C5C7B] "
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
              "Log in"
            )}
          </button>

          <p className="text-sm text-[#EFEFEF] text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-[#877EFF] text-sm font-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div >
      <div>
        <img className="h-[30rem] mr-4 rounded-md w-[40vw] hidden lg:block"
         alt="" src="https://img.freepik.com/free-photo/full-shot-woman-reading-with-smartphone_23-2149629602.jpg?w=740&t=st=1711898721~exp=1711899321~hmac=bb6cb1a6274ab440f7bf2cb3ecfb375126306502faf3459e5921bb7c85221f9a"
        ></img>
      </div>
    </div>
  );
};

export default Login