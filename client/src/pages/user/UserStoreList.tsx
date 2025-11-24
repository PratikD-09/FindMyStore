import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StoreCard from "../../components/StoreCard";
import axios from "axios";
import { Link } from "react-router-dom";

interface StoreType {
  id: number;
  category: string,
  name: string;
  email: string;
  address: string;
}




export default function UserStoreList() {

  const [storeList, setStoreList] = useState<StoreType[]>([]);


  const getAllStores = async () => {
    try {
      const res = await API.get("/api/stores");
      // console.log(res.data.data)
      setStoreList(res.data.data)
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    getAllStores();

  }, [])

  // console.log(storeList);


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Available Stores
          </h1>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeList.map((store) => (
              <Link key={store.id} to={`/stores/${store.id}`}>
                <StoreCard store={store} key={store.id} />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>

  );
}
