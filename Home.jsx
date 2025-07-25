// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Phone" className="w-full p-2 border rounded" />
          <textarea placeholder="Summary" rows="4" className="w-full p-2 border rounded"></textarea>
        </form>
      </div>

      {/* Live Preview */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="bg-white p-4 rounded border">
          <p className="font-bold text-lg">John Doe</p>
          <p>Email: john@example.com</p>
          <p>Phone: +91-9876543210</p>
          <p className="mt-4">"A passionate software developer..."</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
