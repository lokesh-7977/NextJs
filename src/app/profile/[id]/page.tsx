"use client";

export default function Profile({params} : any) {
  return (
    <div className="bg-black text-white">
      <h1>Profile</h1>
      <p>Welcome to your profile page!</p>
      <span> this is is {params.id}</span>
    </div>
  );
}