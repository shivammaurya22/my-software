"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (searchQuery = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard?name=${encodeURIComponent(searchQuery)}`
      );
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setCurrentPage(1); // Reset to page 1 after new search
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(search);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/dashboard", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (json.success) {
        fetchData(search); // refresh the list
      } else {
        alert("Failed to delete entry.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-purple-700 outline-lime-50 p-2 rounded w-full max-w-md"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Index</th>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">
                  Registration No.
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Work Details
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Payment Status
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Date & Time
                </th>
                <th className="border border-gray-300 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    No records found
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item._id} className="hover:bg-purple-50">
                    <td className="border border-gray-300 p-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2">
                      {item.registrationNumber}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.workDescription}
                    </td>
                    <td className="border border-gray-300 p-2 capitalize">
                      {item.paymentStatus}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(item.dateTime).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 
                            19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 
                            5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 
                            .562c.34-.059.68-.114 1.022-.165m0 0a48.11 
                            48.11 0 0 1 3.478-.397m7.5 
                            0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 
                            51.964 0 0 0-3.32 0c-1.18.037-2.09 
                            1.022-2.09 2.201v.916m7.5 0a48.667 
                            48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded border border-purple-700 text-purple-700 hover:bg-purple-100 disabled:opacity-50"
              >
                {/* Left Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-purple-700 text-purple-700 hover:bg-purple-100 disabled:opacity-50"
              >
                {/* Right Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
