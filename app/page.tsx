'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

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

  const handleChange = (e:any) => {
    setValue(e.target.value);
  };

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
      <div className="lg:w-96 h-[100vh] text-black bg-white relative">
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
                          <Image className="" alt={e.profile.username} width={48} height={48} src={e.avatar}></Image>
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
        <div className="flex">
          <h1 className="text-3xl font-semibold px-4">Select User</h1>
          <select className="py-3 px-3 bg-gray-600" onChange={handleChange} value={value}>
            <option value="" disabled hidden>Select user</option>
            {data.map((user,index) => (
              <option key={index} value={user.id}>
                <Image width={40} height={40} alt='' src={user.avatar}></Image>
                {user.profile.firstName} {user.profile.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
