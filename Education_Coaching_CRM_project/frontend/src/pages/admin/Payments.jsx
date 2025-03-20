import { useEffect, useState } from "react";
import { getPayments } from "../../services/adminServices";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            const res = await getPayments();
            setPayments(res);
        };
        fetchPayments();
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <Navbar />

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Payments</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3 text-left">Student Name</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <tr key={payment._id} className="border-b hover:bg-gray-100">
                                            <td className="p-3">{payment.studentName}</td>
                                            <td className="p-3">₹{payment.amount}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                                    payment.status === "Paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="p-4 text-center text-gray-500">
                                            No payments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPayments;
