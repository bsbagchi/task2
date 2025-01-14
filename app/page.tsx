'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  profile: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  avatar: string;
  jobTitle: string;
  Bio: string;
  createdAt: string;
}

export default function Home() {
  const [data, setData] = useState<UserData[]>([]);
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [hidden, setHidden]=useState(' hidden ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        setData(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Handle error by setting loading to false
      }
    };

    fetchData();
  }, []);

 

  const formatCreatedAt = (createdAt:any) => {
    const date = new Date(createdAt);
    
    // Format date (e.g., "2021-12-17")
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
    
    // Format time in AM/PM without seconds (e.g., "10:30 AM")
    const formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return { formattedDate, formattedTime };
  };

  const padZero = (num:any) => {
    return num.toString().padStart(2, '0');
  };

  console.log(data);
  console.log(value);

  return (
    <div className="flex">
      <div className="lg:w-96 overflow-hidden h-[100vh] text-black bg-white relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <p className="text-center">Loading...</p>
          </div>
        )}
        {!isLoading && (
          <>
            {value ? (
              data.map((e) => (
                e.id === value && (
                  <div key={e.id} className="flex flex-col px-2 py-9 space-y-4">
                    <div className="px-2 border">
                      <div className="border-2 mx-auto w-40 h-40 border-black rounded-full overflow-hidden">
                        {e.avatar ? (
                          <Image className="text-center " alt={" no image of "+e.profile.username} width={160} height={160} src={e.avatar}></Image>
                          ) : (
                          <p>No image available</p>
                        )}
                      </div>
                      <h1 className="text-center font-mono text-2xl py-5 ">{e.profile.username}</h1>
                    </div>
                    <div className="text-2xl px-2 border py-3">
                      <h1 className="font-semibold">Full Name:</h1> 
                      <h1 className="flex px-3">{e.profile.firstName}<span className="px-3">{e.profile.lastName}</span></h1>
                    </div>
                    <div className="text-2xl px-2 border py-3">
                      <h1 className="font-semibold">Gmail:</h1>
                      <h1 className="px-3">{e.profile.email}</h1>
                    </div>
                    <div className="text-2xl px-2 border py-3">
                      <h1 className="font-semibold ">Job Title:</h1>
                      <h1 className="px-3">{e.jobTitle}</h1>
                    </div>
                    <div className="text-2xl px-2 border py-3">
                      <h1 className="font-semibold">Bio:</h1>
                      <p className="px-3">{e.Bio}</p>
                    </div>
                    <div className="text-2xl border-t px-2">
                      <h1 className="font-semibold">Created At</h1>
                      <div className="flex px-2">
                        <h1>Date:</h1>
                        <h1 className="px-2">{formatCreatedAt(e.createdAt).formattedDate}</h1>
                      </div>
                      <div className="flex px-2">
                        <h1>Time:</h1>
                        <h1 className="px-2">{formatCreatedAt(e.createdAt).formattedTime}</h1>
                      </div>
                    </div>
                  </div>
                )
              ))
            ) : (
              <p className="text-center mt-10">Select a user from the dropdown</p>
            )}
          </>
        )}
        {!isLoading && data.length === 0 && (
          <p className="text-center mt-10">No data available</p>
        )}
      </div>
      <div className="flex flex-col p-4">
        <h1 className="mx-5 text-3xl font-black">USER</h1>
     
         <button onClick={()=>hidden===' hidden '?setHidden('  '):setHidden(' hidden ')}><h1 className="text-3xl border  bg-gray-300 shadow-2xl shadow-gray-500 text-black py-2 flex font-semibold px-4">Select User <div className="px-3  rotate-180">^</div></h1></button> 

          <ul className={"py-3 px-3 text-black h-96 overflow-auto bg-white "+hidden}>{data.map((user,index) => (
              <li onClick={()=>{setValue(user.id);
                setHidden(' hidden ');
               }} className="w-full  border-b-2 pt-3 h-fit hover:bg-gray-300 cursor-pointer flex" key={index} value={user.id}>
                <div className="w-12 h-12 rounded-full overflow-hidden"><Image width={48} height={48} alt={'Image is not available'} src={user.avatar}></Image></div>

                <h1 className='text-xl pl-3 font-semibold'>{user.profile.firstName}</h1> <h1 className='px-2 text-xl font-semibold'>{user.profile.lastName}</h1>
              </li>
            ))}</ul>
          
        
      </div>
    </div>
  );
}
