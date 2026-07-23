/*=========================================================
AI Question Paper Generator v2.0
Universal Parser
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Global Variables
//=========================================================

let parser = {

    rawText: "",

    paragraphs: [],

    questions: [],

    subject: "",

    currentChapter: "General",

    currentSection: "A",

    currentMarks: 1

};

//=========================================================
// Section → Marks
//=========================================================

const SECTION_MARKS = {

    A:1,

    B:2,

    C:3,

    D:4,

    E:5

};

//=========================================================
// Start Parser
//=========================================================

function parseDocument(text){

    parser.rawText=text;

    parser.questions=[];

    parser.currentChapter="General";

    parser.currentSection="A";

    parser.currentMarks=1;

    parser.paragraphs=text

        .split(/\n\s*\n/)

        .map(x=>x.trim())

        .filter(x=>x.length>0);

    console.log("================================");

    console.log("Universal Parser Started");

    console.log("Paragraphs :",parser.paragraphs.length);

    console.log("================================");

    detectSubject();

    parseParagraphs();

}

//=========================================================
// Parse All Paragraphs
//=========================================================

function parseParagraphs(){

    parser.paragraphs.forEach(function(paragraph){

        parseParagraph(paragraph);

    });

    finalizeParser();

}
/*=========================================================
Universal Parser
Part 2 : Detection Engine
=========================================================*/

//=========================================================
// Subject Detection
//=========================================================

function detectSubject(){

    const text = parser.rawText.toLowerCase();

    if(text.includes("python") ||
       text.includes("sql") ||
       text.includes("computer science")){

        parser.subject="Computer Science";
        return;

    }

    if(text.includes("matrix") ||
       text.includes("integration") ||
       text.includes("derivative") ||
       text.includes("determinant")){

        parser.subject="Mathematics";
        return;

    }

    if(text.includes("current") ||
       text.includes("resistance") ||
       text.includes("ohm")){

        parser.subject="Physics";
        return;

    }

    if(text.includes("mole") ||
       text.includes("chemical") ||
       text.includes("reaction")){

        parser.subject="Chemistry";
        return;

    }

    if(text.includes("cell") ||
       text.includes("photosynthesis") ||
       text.includes("biology")){

        parser.subject="Biology";
        return;

    }

    parser.subject="General";

    console.log("Detected Subject :",parser.subject);

}

//=========================================================
// Parse One Paragraph
//=========================================================

function parseParagraph(paragraph){

    const lines = paragraph

        .split("\n")

        .map(x=>x.trim())

        .filter(x=>x.length>0);

    lines.forEach(function(line){

        if(isChapter(line)){

            parser.currentChapter=getChapter(line);

            return;

        }

        if(isSection(line)){

            parser.currentSection=getSection(line);

            parser.currentMarks=

                SECTION_MARKS[parser.currentSection];

            return;

        }

        const marks=getMarks(line);

        if(marks!==null){

            parser.currentMarks=marks;

        }

        if(isQuestion(line)){

            parser.questions.push({

                subject:parser.subject,

                chapter:parser.currentChapter,

                section:parser.currentSection,

                marks:parser.currentMarks,

                type:getQuestionType(line),

                question:cleanQuestion(line),

                difficulty:getDifficulty(line)

            });

        }

    });

}

//=========================================================
// Chapter Detection
//=========================================================

function isChapter(line){

    return /^(chapter|unit|lesson|topic)/i.test(line);

}

function getChapter(line){

    return line

        .replace(/^(chapter|unit|lesson|topic)\s*:?\s*/i,"")

        .trim();

}

//=========================================================
// Section Detection
//=========================================================

function isSection(line){

    return /^section\s+[A-E]/i.test(line);

}

function getSection(line){

    const m=line.match(/[A-E]/i);

    return m?m[0].toUpperCase():"A";

}

//=========================================================
// Marks Detection
//=========================================================

function getMarks(line){

    line=line.toLowerCase();

    if(line.includes("1 mark")) return 1;

    if(line.includes("2 mark")) return 2;

    if(line.includes("3 mark")) return 3;

    if(line.includes("4 mark")) return 4;

    if(line.includes("5 mark")) return 5;

    return null;

}

//=========================================================
// Question Detection
//=========================================================

function isQuestion(line){

    return(

        /^q\.?\s*\d+/i.test(line) ||

        /^\d+\./.test(line) ||

        /^\d+\)/.test(line) ||

        /^question\s+\d+/i.test(line)

    );

}

//=========================================================
// Clean Question
//=========================================================

function cleanQuestion(line){

    return line

        .replace(/^q\.?\s*\d+\s*[:.)-]?\s*/i,"")

        .replace(/^question\s*\d+\s*[:.)-]?\s*/i,"")

        .replace(/^\d+\s*[.)-]\s*/,"")

        .trim();

}

//=========================================================
// Question Type
//=========================================================

function getQuestionType(question){

    const q=question.toLowerCase();

    if(q.includes("mcq"))

        return "MCQ";

    if(q.includes("assertion"))

        return "Assertion";

    if(q.includes("case study"))

        return "Case Study";

    if(q.includes("python"))

        return "Programming";

    if(q.includes("sql"))

        return "SQL";

    return "Theory";

}

//=========================================================
// Difficulty
//=========================================================

function getDifficulty(question){

    const words=question.split(" ").length;

    if(words<=8)

        return "Easy";

    if(words<=18)

        return "Medium";

    return "Hard";

}
