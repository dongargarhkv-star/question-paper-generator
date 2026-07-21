import React, { useEffect, useState } from "react";
import axios from "axios";

function GeneratedPapers() {

    const [papers, setPapers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadPapers();

    }, []);

    const loadPapers = async () => {

        try {

            const response = await axios.get("/api/papers");

            setPapers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const deletePaper = async (id) => {

        if (!window.confirm("Delete this question paper?"))
            return;

        try {

            await axios.delete(`/api/papers/${id}`);

            loadPapers();

        }

        catch {

            alert("Unable to delete paper.");

        }

    };

    const downloadPDF = (id) => {

        window.open(`/api/export/pdf/${id}`);

    };

    const downloadDOCX = (id) => {

        window.open(`/api/export/docx/${id}`);

    };

    const filtered = papers.filter((paper) =>

        paper.exam_name.toLowerCase().includes(search.toLowerCase()) ||

        paper.subject.toLowerCase().includes(search.toLowerCase()) ||

        paper.class_name.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Generated Question Papers

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <input

                                className="form-control"

                                placeholder="Search by Exam, Subject or Class..."

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                            />

                        </div>

                    </div>

                    <table className="table table-striped table-bordered">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>

                                <th>Exam</th>

                                <th>Subject</th>

                                <th>Class</th>

                                <th>Marks</th>

                                <th>Date</th>

                                <th width="320">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filtered.length===0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >

                                            No Question Papers Found.

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filtered.map((paper)=>

                                    (

                                        <tr key={paper.id}>

                                            <td>{paper.id}</td>

                                            <td>{paper.exam_name}</td>

                                            <td>{paper.subject}</td>

                                            <td>{paper.class_name}</td>

                                            <td>{paper.max_marks}</td>

                                            <td>{paper.created_at}</td>

                                            <td>

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={()=>downloadPDF(paper.id)}
                                                >
                                                    PDF
                                                </button>

                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={()=>downloadDOCX(paper.id)}
                                                >
                                                    DOCX
                                                </button>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={()=>deletePaper(paper.id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default GeneratedPapers;
