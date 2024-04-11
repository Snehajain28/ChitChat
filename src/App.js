import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useStateValues } from "./Utils/Provider";
import Saved from "./pages/Saved";
import AllUsers from "./pages/AllUsers";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Explore from "./pages/Explore";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { ToastContainer } from "react-toast";
import Layout from "./Layout";


function App() {
  const [{ user }, dispatch] = useStateValues();

  useEffect((() => {
    const loggedinuser = localStorage.getItem('user');
   
    if (loggedinuser) {
      dispatch({
        type: "SET_USER",
        user: JSON.parse(loggedinuser)
      })
    }

  }), [dispatch])

  return (
    <div className="">
      <ToastContainer />
      {!user &&

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      }
      <Routes>
        {
          user &&
          <>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:id" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/profile/:id/*" element={<Profile />} />
              <Route path="/update-profile/:id" element={<UpdateProfile />} />
              <Route path="*" element={<NotFound />} />
            </Route >
          </>}
        <Route path="*"  />
      </Routes>
    </div>
  );
}

export default App;
