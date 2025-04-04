import data from '../../data/data.json'; // Adjust the path based on your folder structure

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Index</th>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Registration No.</th>
            <th className="border border-gray-300 p-2 text-left">Work Details</th>
            <th className="border border-gray-300 p-2 text-left">Payment Status</th>
            <th className="border border-gray-300 p-2 text-left">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.index}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">{item.registrationNo}</td>
              <td className="border border-gray-300 p-2">{item.workDetails}</td>
              <td className="border border-gray-300 p-2">{item.paymentStatus}</td>
              <td className="border border-gray-300 p-2">{item.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}