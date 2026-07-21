import React from "react";
import { Link } from "react-router-dom";
import {
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaFileAlt
} from "react-icons/fa";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom shadow">

            <div className="container-fluid">

                {/* Logo */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/dashboard"
                >

                    <FaFileAlt
                        size={28}
                        className="me-2"
                    />

                    AI Question Paper Generator

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item me-4">

                            <span className="text-white">

                                <FaUserCircle
                                    size={22}
                                    className="me-2"
                                />

                                Welcome, Teacher

                            </span>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/settings"
                            >

                                <FaCog className="me-1" />

                                Settings

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link text-warning"
                                to="/login"
                            >

                                <FaSignOutAlt className="me-1" />

                                Logout

                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
