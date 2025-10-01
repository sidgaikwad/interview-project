"use client";

import React, { useEffect, useState } from "react";

type User = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
  location: { city: string; country: string };
  phone: string;
  gender: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("female");
  const [searchItem, setSearchItem] = useState<string>("");

  useEffect(() => {
    fetch("https://randomuser.me/api?results=12")
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchedGender = 
    filter === "all" ? true : user.gender === filter;
    // const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    // const 
    return matchedGender;
  })

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="flelx flex-col sm:flex-row items-center gap-4 mb-8">
        {/* {Gender filter code over here} */}
        <div className="flex gap-2">
          <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}
          `}
          >
            All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md p-4 flex items-center border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl"
          >
            {/* Top tab like an ID badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-300 w-24 h-6 rounded-md z-10"></div>

            {/* Profile Image */}
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-4"
            />

            {/* User Info */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800  truncate max-w-[200px] mb-2">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-gray-500 text-sm underline truncate max-w-[200px] mb-1">
                {user.email}
              </p>
              <p className="text-gray-600 text-sm underline truncate max-w-[200px] mb-1">
                {user.location.city}, {user.location.country}
              </p>
              <p className="text-gray-600 text-sm underline truncate max-w-[200px]">
                {user.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
