import { useEffect, useState } from "react";
import { getUsers } from "../backend/api";
import Loader from "../components/Loader";
import UserCard from "../components/UserCard";

const AllUsers = () => {
  
  const [creators , setCreators] = useState([]);

  async function getData () {
    const data = await getUsers();
    setCreators(data);
  }
 useEffect ( ( () => {
  getData();
 }) ,[])
 
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        { !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;