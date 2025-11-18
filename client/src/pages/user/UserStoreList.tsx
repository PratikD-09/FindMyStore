import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StoreCard from "../../components/StoreCard";
import axios from "axios";

interface StoreType {
  id: number;
  category:string,
  name: string;
  email: string;
  address: string;
}



export interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: number;
}

export default function UserStoreList() {
const stores = [
  {
    id: 1,
    name: "FreshMart Grocery",
    location: "Pune, Maharashtra",
    description: "Daily essentials, vegetables, fruits & kitchen goods.",
    image:
      "https://images.unsplash.com/photo-1585325701954-1904c63eab3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "TechZone Electronics",
    location: "Mumbai, Maharashtra",
    description:
      "Mobiles, laptops, accessories & latest electronic gadgets.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Book Haven",
    location: "Nagpur, Maharashtra",
    description:
      "Wide collection of books — fiction, non-fiction, academic & more.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
];



   const [storeList, setStoreList] = useState<StoreType[]>([
      
    ]);


  const getAllStores = async()=>{
    try {
      const res = await axios.get("/api/stores");
      console.log(res.data.data)
      setStoreList(res.data.data)
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
      getAllStores();
     
    }, [])

    console.log(storeList);


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
            <StoreCard key={store.id} />
          ))}
        </div>

      </div>
    </div>
    </>
    
  );
}
