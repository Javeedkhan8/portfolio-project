import { useEffect, useState } from "react";
import { getReports } from "../../services/adminServices";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const res = await getReports();
            setReports(Array.isArray(res) ? res : []);
        };
        fetchReports();
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Reports</h2>

                    {reports.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                                >
                                    <h3 className="text-lg font-semibold text-gray-700">{report.title}</h3>
                                    <p className="text-gray-500 mt-2 font-semibold text-xl">{report.value}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">No reports available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
