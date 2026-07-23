/*=========================================================
AI Question Paper Generator v2.0
Universal Converter
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Converter Object
//=========================================================

let converter={

    questions:[],

    converted:[],

    subject:"",

    board:"CBSE",

    className:"XII",

    language:"English"

};

//=========================================================
// Start Converter
//=========================================================

function convertQuestionBank(questions){

    converter.questions=questions;

    converter.converted=[];

    if(!questions || questions.length===0){

        console.error("No questions received.");

        return;

    }

    console.log("================================");

    console.log("Converter Started");

    console.log("Questions :",questions.length);

    console.log("================================");

    questions.forEach(function(q){

        converter.converted.push(

            convertQuestion(q)

        );

    });

    finalizeConversion();

}
/*=========================================================
AI Question Paper Generator v2.0
Universal Converter
Part 2 : Question Converter
=========================================================*/

//=========================================================
// Convert One Question
//=========================================================

function convertQuestion(question){

    return{

        //-----------------------------------------
        // Unique ID
        //-----------------------------------------

        id: generateQuestionID(),

        //-----------------------------------------
        // Basic Information
        //-----------------------------------------

        subject: question.subject || "",

        chapter: question.chapter || "General",

        topic: question.topic || "",

        section: question.section || "A",

        //-----------------------------------------
        // Marks
        //-----------------------------------------

        marks: Number(question.marks) || 1,

        //-----------------------------------------
        // Classification
        //-----------------------------------------

        type: question.type || "Theory",

        difficulty: question.difficulty || "Medium",

        //-----------------------------------------
        // Metadata
        //-----------------------------------------

        language: converter.language,

        board: converter.board,

        className: converter.className,

        //-----------------------------------------
        // Question Data
        //-----------------------------------------

        question: question.question.trim(),

        answer: "",

        options: [],

        solution: "",

        //-----------------------------------------
        // Images / Diagrams
        //-----------------------------------------

        image: "",

        diagram: "",

        //-----------------------------------------
        // Search Keywords
        //-----------------------------------------

        keywords: extractKeywords(question.question),

        //-----------------------------------------
        // Source
        //-----------------------------------------

        source: "Imported"

    };

}

//=========================================================
// Generate Question ID
//=========================================================

function generateQuestionID(){

    return "Q" +

        Date.now().toString(36) +

        Math.random()

            .toString(36)

            .substring(2,7);

}
/*=========================================================
AI Question Paper Generator v2.0
Universal Converter
Part 3 : Keywords & Validation
=========================================================*/

//=========================================================
// Extract Keywords
//=========================================================

function extractKeywords(question){

    if(!question)
        return [];

    const stopWords=[

        "the","is","are","was","were","a","an","of",

        "to","in","on","for","and","or","with",

        "what","why","how","write","define",

        "explain","give","list","state"

    ];

    return question

        .toLowerCase()

        .replace(/[^a-z0-9 ]/g," ")

        .split(/\s+/)

        .filter(word=>

            word.length>2 &&

            !stopWords.includes(word)

        )

        .filter((word,index,array)=>

            array.indexOf(word)===index

        );

}

//=========================================================
// Detect MCQ Options
//=========================================================

function extractOptions(question){

    if(!question)

        return [];

    const options=[];

    const lines=question.split("\n");

    lines.forEach(function(line){

        if(/^[A-D][.)]/i.test(line)){

            options.push(

                line.replace(/^[A-D][.)]\s*/i,"").trim()

            );

        }

    });

    return options;

}

//=========================================================
// Validate Converted Question
//=========================================================

function validateConvertedQuestion(question){

    if(!question.question)

        return false;

    if(question.question.length<5)

        return false;

    if(!question.chapter)

        question.chapter="General";

    if(!question.section)

        question.section="A";

    if(!question.type)

        question.type="Theory";

    if(!question.difficulty)

        question.difficulty="Medium";

    if(!question.language)

        question.language="English";

    if(!question.board)

        question.board="CBSE";

    if(!question.className)

        question.className="XII";

    return true;

}
/*=========================================================
AI Question Paper Generator v2.0
Universal Converter
Part 4 : Finalization & Storage
=========================================================*/

//=========================================================
// Finalize Conversion
//=========================================================

function finalizeConversion(){

    //-------------------------------------------------
    // Remove Invalid Questions
    //-------------------------------------------------

    converter.converted = converter.converted.filter(function(q){

        return validateConvertedQuestion(q);

    });

    //-------------------------------------------------
    // Remove Duplicate Questions
    //-------------------------------------------------

    removeConvertedDuplicates();

    //-------------------------------------------------
    // Sort Question Bank
    //-------------------------------------------------

    sortConvertedQuestions();

    //-------------------------------------------------
    // Save
    //-------------------------------------------------

    saveConvertedQuestionBank();

    //-------------------------------------------------
    // Preview
    //-------------------------------------------------

    console.log("================================");

    console.log("Converted Questions");

    console.table(converter.converted);

    console.log("================================");

}
