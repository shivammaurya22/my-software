'use client';

import { useState } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    registrationNo: '',
    workDescription: '',
    paymentStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          registrationNumber: formData.registrationNo,
          workDescription: formData.workDescription,
          paymentStatus: formData.paymentStatus,
          dateTime: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json(); // Log the error response
        console.error('Error response:', errorData);
        throw new Error('Failed to save data');
      }

      const data = await response.json();
      console.log('Data saved successfully:', data);
      // Optionally, reset the form or show a success message
      setFormData({
        fullName: '',
        registrationNo: '',
        workDescription: '',
        paymentStatus: '',
      });
    } catch (error) {
      console.error('Error saving data:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="max-w-md mx-auto my-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">Add Data Work</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-purple-700 outline-none rounded-md shadow-sm p-2 focus:ring focus:ring-purple-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700">
            Registration No.
          </label>
          <input
           type="number"
            id="registrationNo"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-purple-700 outline-none rounded-md shadow-sm p-2 focus:ring focus:ring-purple-700"
            min="0" // Ensures only positive numbers
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workDescription" className="block text-sm font-medium text-gray-700">
            Work Description
          </label>
          <textarea
            id="workDescription"
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full border outline-none border-purple-700 rounded-md shadow-sm p-2 focus:ring focus:ring-purple-700"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">
            Payment Status
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            required
            className="mt-1 block w-full border outline-none border-purple-700 rounded-md shadow-sm p-2 focus:ring focus:ring-purple-700"
          >
            <option value="">Select Payment Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              fullName: '',
              registrationNo: '',
              workDescription: '',
              paymentStatus: '',
            })}
            className="inline-flex justify-center px-4 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}