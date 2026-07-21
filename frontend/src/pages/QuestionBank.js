import React, { useEffect, useState } from "react";
import axios from "axios";

function QuestionBank() {

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {

        try {

            const response = await axios.get("/api/questions");

            setQuestions(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const deleteQuestion = async (id) => {

        if (!window.confirm("Delete this question?"))
            return;

        try {

            await axios.delete(`/api/questions/${id}`);

            loadQuestions();

        }

        catch (error) {

            alert("Unable to delete question.");

        }

    };

    const filteredQuestions = questions.filter((q) =>

        q.question_text.toLowerCase().includes(search.toLowerCase()) ||

        String(q.marks).includes(search)

    );

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Question Bank

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <input

                                className="form-control"

                                placeholder="Search Question..."

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                            />

                        </div>

                    </div>

                    <table className="table table-striped table-bordered">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Question</th>

                                <th>Marks</th>

                                <th>Difficulty</th>

                                <th>Bloom Level</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredQuestions.length===0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >

                                            No Questions Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredQuestions.map((q)=>

                                    (

                                        <tr key={q.id}>

                                            <td>{q.id}</td>

                                            <td>{q.question_text}</td>

                                            <td>{q.marks}</td>

                                            <td>{q.difficulty}</td>

                                            <td>{q.blooms_level}</td>

                                            <td>

                                                <button

                                                    className="btn btn-warning btn-sm me-2"

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() => deleteQuestion(q.id)}

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

export default QuestionBank;
