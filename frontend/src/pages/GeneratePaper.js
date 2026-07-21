import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GeneratePaper() {

    const navigate = useNavigate();

    const [blueprints, setBlueprints] = useState([]);

    const [selectedBlueprint, setSelectedBlueprint] = useState("");

    const [examName, setExamName] = useState("");

    const [schoolName, setSchoolName] = useState("");

    const [className, setClassName] = useState("");

    const [subject, setSubject] = useState("");

    const [duration, setDuration] = useState("3 Hours");

    const [maxMarks, setMaxMarks] = useState("");

    const [selectionMode, setSelectionMode] = useState("random");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadBlueprints();

    }, []);

    const loadBlueprints = async () => {

        try {

            const response = await axios.get("/api/blueprint/all");

            setBlueprints(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const generatePaper = async () => {

        if (selectedBlueprint === "") {

            alert("Please select a blueprint.");

            return;

        }

        try {

            setLoading(true);

            const blueprint = blueprints[selectedBlueprint];

            const response = await axios.post(

                "/api/generate/paper",

                {
                    blueprint,
                    exam_name: examName,
                    school_name: schoolName,
                    class_name: className,
                    subject: subject,
                    duration: duration,
                    max_marks: maxMarks,
                    mode: selectionMode
                }

            );

            localStorage.setItem(

                "generatedPaper",

                JSON.stringify(response.data)

            );

            setLoading(false);

            navigate("/preview");

        }

        catch (error) {

            setLoading(false);

            alert("Unable to generate question paper.");

            console.log(error);

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Generate Question Paper

            </h2>

            <div className="card shadow p-4">

                <div className="row">

                    <div className="col-md-6">

                        <label className="form-label">

                            School Name

                        </label>

                        <input

                            className="form-control"

                            value={schoolName}

                            onChange={(e)=>setSchoolName(e.target.value)}

                            placeholder="PM SHRI Kendriya Vidyalaya Dongargarh"

                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">

                            Examination

                        </label>

                        <input

                            className="form-control"

                            value={examName}

                            onChange={(e)=>setExamName(e.target.value)}

                            placeholder="Half Yearly Examination"

                        />

                    </div>

                </div>

                <div className="row mt-3">

                    <div className="col-md-4">

                        <label className="form-label">

                            Class

                        </label>

                        <input

                            className="form-control"

                            value={className}

                            onChange={(e)=>setClassName(e.target.value)}

                        />

                    </div>

                    <div className="col-md-4">

                        <label className="form-label">

                            Subject

                        </label>

                        <input

                            className="form-control"

                            value={subject}

                            onChange={(e)=>setSubject(e.target.value)}

                        />

                    </div>

                    <div className="col-md-4">

                        <label className="form-label">

                            Maximum Marks

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            value={maxMarks}

                            onChange={(e)=>setMaxMarks(e.target.value)}

                        />

                    </div>

                </div>

                <div className="row mt-3">

                    <div className="col-md-6">

                        <label className="form-label">

                            Duration

                        </label>

                        <input

                            className="form-control"

                            value={duration}

                            onChange={(e)=>setDuration(e.target.value)}

                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">

                            Blueprint

                        </label>

                        <select

                            className="form-select"

                            value={selectedBlueprint}

                            onChange={(e)=>

                            setSelectedBlueprint(e.target.value)}

                        >

                            <option value="">

                                Select Blueprint

                            </option>

                            {

                                blueprints.map(

                                    (_,index)=>

                                    (

                                        <option

                                            value={index}

                                            key={index}

                                        >

                                            Blueprint {index+1}

                                        </option>

                                    )

                                )

                            }

                        </select>

                    </div>

                </div>

                <hr/>

                <h5>

                    Question Selection Mode

                </h5>

                <div className="form-check">

                    <input

                        type="radio"

                        className="form-check-input"

                        checked={selectionMode==="random"}

                        onChange={()=>

                        setSelectionMode("random")}

                    />

                    <label className="form-check-label">

                        Random Selection

                    </label>

                </div>

                <div className="form-check">

                    <input

                        type="radio"

                        className="form-check-input"

                        checked={selectionMode==="difficulty"}

                        onChange={()=>

                        setSelectionMode("difficulty")}

                    />

                    <label className="form-check-label">

                        Difficulty Balanced

                    </label>

                </div>

                <div className="form-check">

                    <input

                        type="radio"

                        className="form-check-input"

                        checked={selectionMode==="blooms"}

                        onChange={()=>

                        setSelectionMode("blooms")}

                    />

                    <label className="form-check-label">

                        Bloom's Taxonomy Balanced

                    </label>

                </div>

                <button

                    className="btn btn-success mt-4"

                    onClick={generatePaper}

                    disabled={loading}

                >

                    {

                        loading ?

                        "Generating..." :

                        "Generate Question Paper"

                    }

                </button>

            </div>

        </div>

    );

}

export default GeneratePaper;
