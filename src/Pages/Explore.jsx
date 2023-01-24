import {  collection,  getDocs,  limit,  onSnapshot, orderBy,  query,} from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { firestore } from "../IIb/config";
import Header from "../Components/Header";
import ProfilePostCard from "../Components/ProfilePostCard";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import Loading from "../Components/Loading";


const Explore = () => {
  const [posts, setposts] = useState([]);
  const [limitNum, setLimitNum] = useState(9);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc"),
        limit(limitNum)   );
   
      onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setposts(posts);
        setLoading(false);
        console.log(posts);
      });
    };
    return getData();
  }, [limitNum]);

  



  return (
    <div>
      <Header />
      <div className="lg:max-w-4xl mt-14 lg:mx-auto mb-9">
        <div className="block sm:hidden p-2">
          <div className="p-2 items-center w-full border-[1px] rounded">
            <form action="">
              <div className="flex gap-2 text-xs text-gray-600">
                <SearchIcon size={17} />
                <input type="text"placeholder="Search" className="bg-transparent h-full outline-none" style={{"color":"	#FFFF00"}} />
                </div>
            </form>
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        )}       
             
               
        
      

        {posts?.length === 0 && !loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center" style={{"fontFamily":"sans-serif", "color":"yellow"}}>No posts yet</div>
          </div>
        )}
        <motion.div layout className="grid grid-cols-4 md:gap-5 gap-0.5 md:p-3 p-0.5">
     
      
       
          {posts.map((post, index) => (
            <ProfilePostCard
              key={post?.id}
              //   span={(index + 1) % 2 === 0 && (index + 1) % 3 !== 0}
              span={[2, 10, 20, 28, 38].includes(index + 1)}
              post={post}  />
              ))}

        </motion.div>
        <div className="flex justify-center mt-5">
          <button   onClick={() => setLimitNum(limitNum + 9)}  className="bg-yellow-500 hover:bg-yellow-900 text-white font-bold py-4 px-5 rounded" style={{"fontFamily":"import", "fontWeight":"bold","fontSize":"20px","gap":"10px"}}   >
          Load More
          </button>
           
          </div>
      </div>
    </div>
  );
};

       

export default Explore;
