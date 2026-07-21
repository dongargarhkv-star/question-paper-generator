import React, { useState } from "react";
import axios from "axios";

function ReviewQuestions() {

    const [questions, setQuestions] = useState([]);

    const handleQuestionChange = (index, value) => {

        const updated = [...questions];

        updated[index].question = value;

        setQuestions(updated);

    };

    const handleMarksChange = (index, value) => {

        const updated = [...questions];

        updated[index].marks = value;

        setQuestions(updated);

    };

    const toggleSelection = (index) => {

        const updated = [...questions];

        updated[index].selected = !updated[index].selected;

        setQuestions(updated);

    };

    const deleteQuestion = (index) => {

        const updated = [...questions];

        updated.splice(index, 1);

        setQuestions(updated);

    };

    const saveQuestions = async () => {

        const selectedQuestions = questions.filter(
            q => q.selected
        );

        try {

            await axios.post(

                "/api/import/save-reviewed",

                {

                    subject_id: 1,

                    chapter_id: 1,

                    questions: selectedQuestions

                }

            );

            alert("Questions Saved Successfully.");

        }

        catch (error) {

            console.log(error);

            alert("Unable to save questions.");

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Review Imported Questions

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>

                            <tr>

                                <th>Select</th>

                                <th>Question</th>

                                <th>Marks</th>

                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                questions.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >

                                            No Questions Available

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    questions.map(

                                        (q,index)=>

                                        (

                                            <tr key={index}>

                                                <td>

                                                    <input

                                                        type="checkbox"

                                                        checked={q.selected}

                                                        onChange={()=>toggleSelection(index)}

                                                    />

                                                </td>

                                                <td>

                                                    <textarea

                                                        className="form-control"

                                                        rows="2"

                                                        value={q.question}

                                                        onChange={(e)=>

                                                        handleQuestionChange(

                                                            index,

                                                            e.target.value

                                                        )}

                                                    />

                                                </td>

                                                <td width="120">

                                                    <select

                                                        className="form-select"

                                                        value={q.marks}

                                                        onChange={(e)=>

                                                        handleMarksChange(

                                                            index,

                                                            e.target.value

                                                        )}

                                                    >

                                                        <option value="1">1</option>

                                                        <option value="2">2</option>

                                                        <option value="3">3</option>

                                                        <option value="4">4</option>

                                                        <option value="5">5</option>

                                                    </select>

                                                </td>

                                                <td width="100">

                                                    <button

                                                        className="btn btn-danger"

                                                        onClick={()=>

                                                        deleteQuestion(index)}

                                                    >

                                                        Delete

                                                    </button>

                                                </td>

                                            </tr>

                                        )

                                    )

                                )

                            }

                        </tbody>

                    </table>

                    <div className="mt-3">

                        <button

                            className="btn btn-success"

                            onClick={saveQuestions}

                        >

                            Save Selected Questions

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ReviewQuestions;
