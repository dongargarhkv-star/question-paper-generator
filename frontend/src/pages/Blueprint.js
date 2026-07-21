import React, { useState } from "react";
import axios from "axios";

function Blueprint() {

    const [subject, setSubject] = useState("");
    const [className, setClassName] = useState("");

    const [lessonInput, setLessonInput] = useState("");
    const [lessons, setLessons] = useState([]);

    const [blueprint, setBlueprint] = useState([]);

    // -----------------------------
    // Add Lesson
    // -----------------------------

    const addLesson = () => {

        if (lessonInput.trim() === "") return;

        if (lessons.includes(lessonInput.trim())) {

            alert("Lesson already added.");

            return;
        }

        setLessons([...lessons, lessonInput.trim()]);
        setLessonInput("");

    };

    // -----------------------------
    // Remove Lesson
    // -----------------------------

    const removeLesson = (lesson) => {

        setLessons(

            lessons.filter(l => l !== lesson)

        );

    };

    // -----------------------------
    // Generate Blueprint
    // -----------------------------

    const generateBlueprint = async () => {

        if (lessons.length === 0) {

            alert("Please add at least one lesson.");

            return;

        }

        try {

            const response = await axios.post(

                "/api/blueprint/generate-table",

                {
                    lessons
                }

            );

            setBlueprint(

                response.data.blueprint_table

            );

        }

        catch (error) {

            alert("Unable to generate blueprint.");

            console.log(error);

        }

    };

    // -----------------------------
    // Update Required Questions
    // -----------------------------

    const updateRequired = (

        row,

        marks,

        value

    ) => {

        const updated = [...blueprint];

        updated[row].required[marks] = Number(value);

        setBlueprint(updated);

    };

    // -----------------------------
    // Save Blueprint
    // -----------------------------

    const saveBlueprint = async () => {

        try {

            await axios.post(

                "/api/blueprint/save",

                blueprint

            );

            alert("Blueprint Saved Successfully.");

        }

        catch (error) {

            alert("Unable to Save Blueprint.");

        }

    };

    // -----------------------------
    // Totals
    // -----------------------------

    const totalQuestions = (marks) => {

        return blueprint.reduce(

            (sum,row)=>

                sum +

                Number(row.required[marks]),

            0

        );

    };

    const totalMarks = () => {

        return (

            totalQuestions("1") * 1 +

            totalQuestions("2") * 2 +

            totalQuestions("3") * 3 +

            totalQuestions("4") * 4 +

            totalQuestions("5") * 5

        );

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Blueprint Generator

            </h2>

            <div className="card shadow p-4 mb-4">

                <div className="row">

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

                            Class

                        </label>

                        <input

                            className="form-control"

                            value={className}

                            onChange={(e)=>setClassName(e.target.value)}

                        />

                    </div>

                </div>

                <hr/>

                <h5>

                    Add Lessons / Chapters

                </h5>

                <div className="input-group">

                    <input

                        className="form-control"

                        placeholder="Enter Lesson Name"

                        value={lessonInput}

                        onChange={(e)=>

                        setLessonInput(e.target.value)}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={addLesson}

                    >

                        Add Lesson

                    </button>

                </div>

                <div className="mt-3">

                    {

                        lessons.map((lesson,index)=>

                        (

                            <span

                                key={index}

                                className="badge bg-primary me-2 mb-2 p-2"

                                style={{cursor:"pointer"}}

                                onClick={()=>

                                removeLesson(lesson)}

                            >

                                {lesson} ✖

                            </span>

                        ))

                    }

                </div>

                <button

                    className="btn btn-success mt-3"

                    onClick={generateBlueprint}

                >

                    Generate Blueprint

                </button>

            </div>

            {

                blueprint.length>0 &&

                <div className="card shadow p-4">

                    <h4>

                        Blueprint Table

                    </h4>

                    <div className="table-responsive">

                        <table className="table table-bordered text-center">

                            <thead>

                                <tr>

                                    <th>Lesson</th>

                                    <th>Avail 1M</th>
                                    <th>Avail 2M</th>
                                    <th>Avail 3M</th>
                                    <th>Avail 4M</th>
                                    <th>Avail 5M</th>

                                    <th>Need 1M</th>
                                    <th>Need 2M</th>
                                    <th>Need 3M</th>
                                    <th>Need 4M</th>
                                    <th>Need 5M</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    blueprint.map((row,index)=>

                                    (

                                        <tr key={index}>

                                            <td>

                                                {row.lesson}

                                            </td>

                                            <td>{row.available["1"]}</td>
                                            <td>{row.available["2"]}</td>
                                            <td>{row.available["3"]}</td>
                                            <td>{row.available["4"]}</td>
                                            <td>{row.available["5"]}</td>

                                            {

                                                ["1","2","3","4","5"].map(

                                                mark=>

                                                (

                                                <td key={mark}>

                                                <input

                                                type="number"

                                                min="0"

                                                max={row.available[mark]}

                                                value={row.required[mark]}

                                                className="form-control"

                                                onChange={(e)=>

                                                updateRequired(

                                                index,

                                                mark,

                                                e.target.value

                                                )}

                                                />

                                                </td>

                                                )

                                                )

                                            }

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                    <hr/>

                    <div className="row">

                        <div className="col-md-2">

                            <strong>

                                1M : {totalQuestions("1")}

                            </strong>

                        </div>

                        <div className="col-md-2">

                            <strong>

                                2M : {totalQuestions("2")}

                            </strong>

                        </div>

                        <div className="col-md-2">

                            <strong>

                                3M : {totalQuestions("3")}

                            </strong>

                        </div>

                        <div className="col-md-2">

                            <strong>

                                4M : {totalQuestions("4")}

                            </strong>

                        </div>

                        <div className="col-md-2">

                            <strong>

                                5M : {totalQuestions("5")}

                            </strong>

                        </div>

                        <div className="col-md-2">

                            <strong>

                                Total Marks : {totalMarks()}

                            </strong>

                        </div>

                    </div>

                    <button

                        className="btn btn-primary mt-4"

                        onClick={saveBlueprint}

                    >

                        Save Blueprint

                    </button>

                </div>

            )}

        </div>

    );

}

export default Blueprint;
