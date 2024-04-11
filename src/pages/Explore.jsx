import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import GridPostList from "../components/GridPostList";
import { getRecentPosts, searchPosts } from "../backend/auth/api";
import { CiFilter, CiSearch } from "react-icons/ci";


const SearchResults = ({ isSearchFetching, searchedPosts }) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {

  const [posts, setPosts] = useState(null);
  const getData = useCallback((async () => {
    const postdata = await getRecentPosts();
    setPosts(postdata);
  }), [])

  useEffect((() => {
    getData();
  }), [getData])


  const [searchValue, setSearchValue] = useState("");
  const { searchedPosts, isFetching: isSearchFetching } = searchPosts(searchValue);

  if (!posts)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts = !shouldShowSearchResults
  //  &&posts?.documents((item) => item.length === 0);

  return (
    <div className=" flex flex-col flex-1 items-center overflow-scroll py-3 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-4 md:gap-9">
        <h2 className=" text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] w-full">Search Posts</h2>
        <div className="flex items-center gap-5 px-3 w-full rounded-lg bg-[#1F1F22] ">
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="Search"
            className="h-12 bg-[#1F1F22] focus:border-none focus:ring-none  placeholder:text-[#5C5C7B]"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>

      <div className=" flex justify-between items-center w-full max-w-5xl mt-6 mb-7">
        <h3 className="text-[18px] md:text-[24px] font-bold leading-[140%] tracking-tighter">Popular Today</h3>

        <div className="flex justify-center items-center gap-3 bg-[#101012] rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-[#EFEFEF]">All</p>
          <CiFilter />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : (
          <GridPostList  posts={posts.documents} />
        )}
      </div>

    </div>
  );
};

export default Explore;