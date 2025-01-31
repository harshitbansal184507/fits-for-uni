import React, { useEffect, useState } from "react";
import Axios from '../utils/Axios'; 
import toast from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get("/api/order/all-orders"); 
        if (response.data.success) {
          setOrders(response.data.orders); 
        } else {
          toast.error("No orders found!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch orders!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 dark:bg-gray-700 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 dark:bg-gray-700 dark:text-white">All Orders</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 dark:text-white">
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Roll No.</th>
            <th className="px-4 py-2">Product Name</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500 dark:bg-gray-700 dark:text-white">
                No orders available.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.orderId} className="border-t">
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.username || "Unknown User"}</td>
                <td className="px-4 py-2">{order.studentClass || "N/A"}</td> {/* Updated to studentClass */}
                <td className="px-4 py-2">{order.rollNo || "N/A"}</td> {/* Updated to rollNo */}
                <td className="px-4 py-2">{order.productName || "Unknown Product"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;