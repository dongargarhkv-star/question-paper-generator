import React, { useEffect, useState } from "react";
import axios from "axios";

function PreviewPaper() {

    const [paper, setPaper] = useState(null);

    useEffect(() => {

        const savedPaper = localStorage.getItem("generatedPaper");

        if (savedPaper) {

            setPaper(JSON.parse(savedPaper));

        }

    }, []);

    const downloadPDF = async () => {

        try {

            const response = await axios.post(

                "/api/export/pdf",

                paper,

                {
                    responseType: "blob"
                }

            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Question_Paper.pdf";

            link.click();

        }

        catch {

            alert("Unable to download PDF.");

        }

    };

    const downloadDOCX = async () => {

        try {

            const response = await axios.post(

                "/api/export/docx",

                paper,

                {
                    responseType: "blob"
                }

            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Question_Paper.docx";

            link.click();

        }

        catch {

            alert("Unable to download DOCX.");

        }

    };

    const printPaper = () => {

        window.print();

    };

    if (!paper) {

        return (

            <div className="container mt-5">

                <div className="alert alert-warning">

                    No Question Paper Generated Yet.

                </div>

            </div>

        );

    }

    return (

        <div className="container my-4">

            <div className="question-paper">

                <div className="text-center mb-4">

                    <h2>{paper.school_name}</h2>

                    <h4>{paper.exam_name}</h4>

                    <h5>{paper.subject}</h5>

                    <hr />

                    <div className="row">

                        <div className="col-md-4">

                            <strong>Class :</strong> {paper.class_name}

                        </div>

                        <div className="col-md-4">

                            <strong>Time :</strong> {paper.duration}

                        </div>

                        <div className="col-md-4">

                            <strong>Max Marks :</strong> {paper.max_marks}

                        </div>

                    </div>

                </div>

                <hr />

                {

                    paper.questions &&

                    paper.questions.map((question,index)=>(

                        <div
                            className="mb-4"
                            key={index}
                        >

                            <strong>

                                Q{index+1}.

                            </strong>

                            {" "}

                            {question.question}

                            <span className="float-end">

                                [{question.marks} Marks]

                            </span>

                        </div>

                    ))

                }

            </div>

            <div className="text-center mt-4">

                <button
                    className="btn btn-success me-2"
                    onClick={downloadPDF}
                >
                    Download PDF
                </button>

                <button
                    className="btn btn-primary me-2"
                    onClick={downloadDOCX}
                >
                    Download DOCX
                </button>

                <button
                    className="btn btn-secondary me-2"
                    onClick={printPaper}
                >
                    Print
                </button>

                <button
                    className="btn btn-warning"
                    onClick={() => window.history.back()}
                >
                    Generate Again
                </button>

            </div>

        </div>

    );

}

export default PreviewPaper;
