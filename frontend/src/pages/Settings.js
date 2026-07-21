import React, { useState } from "react";

function Settings() {

    const [settings, setSettings] = useState({

        schoolName: "PM SHRI Kendriya Vidyalaya Dongargarh",

        principalName: "",

        teacherName: "Amit Yerpude",

        designation: "PGT (Computer Science)",

        examDuration: "3 Hours",

        defaultMarks: "70",

        instructions:
`General Instructions:

1. All questions are compulsory unless otherwise stated.

2. Read all questions carefully.

3. Figures to the right indicate marks.

4. Use neat and clean handwriting.`

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSettings({

            ...settings,

            [name]: value

        });

    };

    const saveSettings = () => {

        localStorage.setItem(

            "systemSettings",

            JSON.stringify(settings)

        );

        alert("Settings Saved Successfully.");

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                System Settings

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                School Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="schoolName"

                                value={settings.schoolName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Principal Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="principalName"

                                value={settings.principalName}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Teacher Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="teacherName"

                                value={settings.teacherName}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Designation

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="designation"

                                value={settings.designation}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Default Exam Duration

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="examDuration"

                                value={settings.examDuration}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Default Maximum Marks

                            </label>

                            <input

                                type="number"

                                className="form-control"

                                name="defaultMarks"

                                value={settings.defaultMarks}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Default Instructions

                        </label>

                        <textarea

                            rows="8"

                            className="form-control"

                            name="instructions"

                            value={settings.instructions}

                            onChange={handleChange}

                        />

                    </div>

                    <button

                        className="btn btn-primary"

                        onClick={saveSettings}

                    >

                        Save Settings

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Settings;
