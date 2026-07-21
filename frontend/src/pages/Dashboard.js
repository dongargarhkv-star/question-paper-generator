import React from "react";
import { Link } from "react-router-dom";
import {
    FaBook,
    FaFolderOpen,
    FaClipboardList,
    FaFileAlt,
    FaUpload,
    FaMagic,
    FaChartBar,
    FaDownload
} from "react-icons/fa";

function Dashboard() {

    const stats = [

        {
            title: "Subjects",
            value: 0,
            icon: <FaBook size={35} />,
            color: "primary"
        },

        {
            title: "Question Banks",
            value: 0,
            icon: <FaFolderOpen size={35} />,
            color: "success"
        },

        {
            title: "Questions",
            value: 0,
            icon: <FaClipboardList size={35} />,
            color: "warning"
        },

        {
            title: "Generated Papers",
            value: 0,
            icon: <FaFileAlt size={35} />,
            color: "danger"
        }

    ];

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                Dashboard
            </h2>

            <p className="text-muted">
                Welcome to the AI Question Paper Generator System.
            </p>

            {/* Statistics */}

            <div className="row">

                {

                    stats.map((item,index)=>(

                        <div
                            className="col-lg-3 col-md-6 mb-4"
                            key={index}
                        >

                            <div className="dashboard-card">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <h5>

                                            {item.title}

                                        </h5>

                                        <h2 className={`text-${item.color}`}>

                                            {item.value}

                                        </h2>

                                    </div>

                                    <div className={`text-${item.color}`}>

                                        {item.icon}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Quick Actions */}

            <div className="row">

                <div className="col-lg-8">

                    <div className="dashboard-card">

                        <h4 className="mb-4">

                            Quick Actions

                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <Link
                                    to="/upload"
                                    className="btn btn-primary w-100 p-3"
                                >

                                    <FaUpload className="me-2"/>

                                    Upload Question Bank

                                </Link>

                            </div>

                            <div className="col-md-6 mb-3">

                                <Link
                                    to="/blueprint"
                                    className="btn btn-success w-100 p-3"
                                >

                                    <FaClipboardList className="me-2"/>

                                    Create Blueprint

                                </Link>

                            </div>

                            <div className="col-md-6 mb-3">

                                <Link
                                    to="/generate"
                                    className="btn btn-warning w-100 p-3 text-white"
                                >

                                    <FaMagic className="me-2"/>

                                    Generate Question Paper

                                </Link>

                            </div>

                            <div className="col-md-6 mb-3">

                                <Link
                                    to="/preview"
                                    className="btn btn-info w-100 p-3 text-white"
                                >

                                    <FaDownload className="me-2"/>

                                    Preview & Download

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Activity */}

                <div className="col-lg-4">

                    <div className="dashboard-card">

                        <h4 className="mb-4">

                            Recent Activity

                        </h4>

                        <ul className="list-group">

                            <li className="list-group-item">
                                No recent activity
                            </li>

                            <li className="list-group-item">
                                Upload a Question Bank to begin
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

            {/* Information */}

            <div className="dashboard-card mt-4">

                <h4 className="mb-3">

                    System Features

                </h4>

                <div className="row">

                    <div className="col-md-4">

                        <ul>

                            <li>Upload PDF/DOCX Question Bank</li>

                            <li>Automatic Question Extraction</li>

                            <li>Review Before Saving</li>

                        </ul>

                    </div>

                    <div className="col-md-4">

                        <ul>

                            <li>Blueprint Generation</li>

                            <li>Random Question Selection</li>

                            <li>Duplicate Question Prevention</li>

                        </ul>

                    </div>

                    <div className="col-md-4">

                        <ul>

                            <li>Download PDF</li>

                            <li>Download DOCX</li>

                            <li>Question Bank Management</li>

                        </ul>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;
