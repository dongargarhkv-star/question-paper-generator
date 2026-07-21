import React, { useState } from "react";
import axios from "axios";
import {
    FaUpload,
    FaFilePdf,
    FaFileWord,
    FaCheckCircle
} from "react-icons/fa";

function UploadQuestionBank() {

    const [file, setFile] = useState(null);

    const [subject, setSubject] = useState("");

    const [className, setClassName] = useState("");

    const [chapter, setChapter] = useState("");

    const [importMode, setImportMode] = useState("review");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {

        setFile(e.target.files[0]);

    };

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF or DOCX file.");

            return;

        }

        if (subject === "" || className === "" || chapter === "") {

            alert("Please fill all fields.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        formData.append("subject_id", subject);

        formData.append("chapter_id", chapter);

        formData.append(
            "review_mode",
            importMode === "review"
        );

        try {

            setLoading(true);

            const response = await axios.post(

                "/api/import/question-bank",

                formData

            );

            setLoading(false);

            if (response.data.mode === "review") {

                alert(
                    "Questions extracted successfully.\nRedirecting to Review Page."
                );

                console.log(response.data.questions);

            } else {

                setMessage(

                    `Successfully imported ${response.data.saved_questions} questions.`

                );

            }

        } catch (error) {

            setLoading(false);

            alert("Upload Failed.");

            console.log(error);

        }

    };

    return (

        <div className="container">

            <h2 className="mb-4">

                Upload Question Bank

            </h2>

            <div className="card shadow p-4">

                {/* Subject */}

                <div className="mb-3">

                    <label className="form-label">

                        Subject

                    </label>

                    <input

                        className="form-control"

                        value={subject}

                        onChange={(e)=>setSubject(e.target.value)}

                        placeholder="Computer Science"

                    />

                </div>

                {/* Class */}

                <div className="mb-3">

                    <label className="form-label">

                        Class

                    </label>

                    <select

                        className="form-select"

                        value={className}

                        onChange={(e)=>setClassName(e.target.value)}

                    >

                        <option value="">Select Class</option>

                        <option>IX</option>

                        <option>X</option>

                        <option>XI</option>

                        <option>XII</option>

                    </select>

                </div>

                {/* Chapter */}

                <div className="mb-3">

                    <label className="form-label">

                        Chapter / Lesson

                    </label>

                    <input

                        className="form-control"

                        value={chapter}

                        onChange={(e)=>setChapter(e.target.value)}

                        placeholder="Computer System"

                    />

                </div>

                {/* Upload */}

                <div className="upload-box">

                    <FaUpload
                        size={50}
                        color="#0d6efd"
                    />

                    <h4 className="mt-3">

                        Upload PDF / DOCX

                    </h4>

                    <input

                        type="file"

                        className="form-control mt-3"

                        accept=".pdf,.doc,.docx"

                        onChange={handleFileChange}

                    />

                    {

                        file &&

                        <p className="mt-3 text-success">

                            <FaCheckCircle />

                            {" "}

                            {file.name}

                        </p>

                    }

                </div>

                {/* Import Mode */}

                <div className="mt-4">

                    <h5>

                        Import Mode

                    </h5>

                    <div className="form-check">

                        <input

                            className="form-check-input"

                            type="radio"

                            checked={importMode==="review"}

                            onChange={()=>setImportMode("review")}

                        />

                        <label className="form-check-label">

                            Review Before Saving (Recommended)

                        </label>

                    </div>

                    <div className="form-check">

                        <input

                            className="form-check-input"

                            type="radio"

                            checked={importMode==="quick"}

                            onChange={()=>setImportMode("quick")}

                        />

                        <label className="form-check-label">

                            Quick Import

                        </label>

                    </div>

                </div>

                {/* Upload Button */}

                <div className="mt-4">

                    <button

                        className="btn btn-primary"

                        onClick={handleUpload}

                        disabled={loading}

                    >

                        {

                            loading ?

                            "Uploading..." :

                            "Upload Question Bank"

                        }

                    </button>

                </div>

                {

                    message &&

                    <div className="alert alert-success mt-4">

                        {message}

                    </div>

                }

            </div>

            {/* Supported Formats */}

            <div className="card mt-4 shadow p-3">

                <h5>

                    Supported Formats

                </h5>

                <p>

                    <FaFilePdf color="red"/>

                    {" "}PDF Question Bank

                </p>

                <p>

                    <FaFileWord color="blue"/>

                    {" "}Microsoft Word (.docx)

                </p>

            </div>

        </div>

    );

}

export default UploadQuestionBank;
