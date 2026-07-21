import React from "react";
import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaUpload,
    FaBook,
    FaClipboardList,
    FaMagic,
    FaEye,
    FaCog,
    FaFolderOpen
} from "react-icons/fa";

function Sidebar() {

    const menuItems = [

        {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard"
        },

        {
            title: "Upload Question Bank",
            icon: <FaUpload />,
            path: "/upload"
        },

        {
            title: "Question Bank",
            icon: <FaBook />,
            path: "/question-bank"
        },

        {
            title: "Blueprint Generator",
            icon: <FaClipboardList />,
            path: "/blueprint"
        },

        {
            title: "Generate Paper",
            icon: <FaMagic />,
            path: "/generate"
        },

        {
            title: "Preview Paper",
            icon: <FaEye />,
            path: "/preview"
        },

        {
            title: "Generated Papers",
            icon: <FaFolderOpen />,
            path: "/generated-papers"
        },

        {
            title: "Settings",
            icon: <FaCog />,
            path: "/settings"
        }
     
<li className="nav-item">
    <Link className="nav-link" to="/generated-papers">
        📄 Generated Papers
    </Link>
</li>
    ];

    return (

        <div className="sidebar">

            <div className="text-center py-4">

                <h4 className="text-white">

                    Teacher Panel

                </h4>

                <hr className="text-secondary"/>

            </div>

            <ul className="list-unstyled">

                {

                    menuItems.map((item,index)=>(

                        <li key={index}>

                            <NavLink

                                to={item.path}

                                className={({isActive})=>

                                    isActive

                                    ? "active"

                                    : ""

                                }

                            >

                                <span
                                    style={{
                                        marginRight:"12px"
                                    }}
                                >

                                    {item.icon}

                                </span>

                                {item.title}

                            </NavLink>

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default Sidebar;
