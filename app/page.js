import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Data Work</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
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
            className="inline-flex justify-center px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}