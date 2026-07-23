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
/*=========================================================
Universal Parser
Part 3 : Advanced Parsing
=========================================================*/

//=========================================================
// Finalize Parser
//=========================================================

function finalizeParser(){

    removeDuplicateQuestions();

    validateQuestions();

    console.log("================================");

    console.log("Questions Extracted :", parser.questions.length);

    console.table(parser.questions);

    console.log("================================");

    saveQuestionBank(parser.questions);

    showImportStatistics();

}

//=========================================================
// Remove Duplicate Questions
//=========================================================

function removeDuplicateQuestions(){

    const seen = new Set();

    parser.questions = parser.questions.filter(q=>{

        const key = q.question.trim().toLowerCase();

        if(seen.has(key))

            return false;

        seen.add(key);

        return true;

    });

}

//=========================================================
// Validate Questions
//=========================================================

function validateQuestions(){

    parser.questions = parser.questions.filter(q=>{

        if(!q.question)

            return false;

        if(q.question.length < 5)

            return false;

        if(!q.chapter)

            q.chapter="General";

        if(!q.section)

            q.section="A";

        if(!q.marks)

            q.marks=1;

        return true;

    });

}

//=========================================================
// Statistics
//=========================================================

function showImportStatistics(){

    let marks={

        1:0,
        2:0,
        3:0,
        4:0,
        5:0

    };

    parser.questions.forEach(q=>{

        if(marks[q.marks]!==undefined)

            marks[q.marks]++;

    });

    let html=`

<h4>Import Successful</h4>

<hr>

<b>Subject :</b> ${parser.subject}<br>

<b>Total Questions :</b> ${parser.questions.length}<br>

<b>Total Chapters :</b> ${getChapterCount()}<br><br>

<table class="table table-bordered">

<tr>

<th>Marks</th>

<th>Questions</th>

</tr>

<tr>

<td>1 Mark</td>

<td>${marks[1]}</td>

</tr>

<tr>

<td>2 Marks</td>

<td>${marks[2]}</td>

</tr>

<tr>

<td>3 Marks</td>

<td>${marks[3]}</td>

</tr>

<tr>

<td>4 Marks</td>

<td>${marks[4]}</td>

</tr>

<tr>

<td>5 Marks</td>

<td>${marks[5]}</td>

</tr>

</table>

`;

    showStatus(html,"success");

}

//=========================================================
// Chapter Count
//=========================================================

function getChapterCount(){

    return new Set(

        parser.questions.map(q=>q.chapter)

    ).size;

}

//=========================================================
// Preview
//=========================================================

function showParsedPreview(){

    const preview=document.getElementById("preview");

    if(!preview)

        return;

    let html="<table class='table table-bordered'>";

    html+="<tr>";

    html+="<th>#</th>";

    html+="<th>Chapter</th>";

    html+="<th>Marks</th>";

    html+="<th>Question</th>";

    html+="</tr>";

    parser.questions.slice(0,20).forEach((q,index)=>{

        html+=`

<tr>

<td>${index+1}</td>

<td>${q.chapter}</td>

<td>${q.marks}</td>

<td>${q.question}</td>

</tr>

`;

    });

    html+="</table>";

    preview.innerHTML=html;

}
/*=========================================================
Universal Parser
Part 4 : Smart Question Builder
=========================================================*/

//=========================================================
// Temporary Buffer
//=========================================================

let currentQuestion = null;

//=========================================================
// Parse Paragraph (Advanced)
//=========================================================

function parseParagraph(paragraph){

    const lines = paragraph
        .split("\n")
        .map(x=>x.trim())
        .filter(x=>x.length>0);

    lines.forEach(function(line){

        //-------------------------------------------------
        // Chapter
        //-------------------------------------------------

        if(isChapter(line)){

            saveCurrentQuestion();

            parser.currentChapter = getChapter(line);

            return;

        }

        //-------------------------------------------------
        // Section
        //-------------------------------------------------

        if(isSection(line)){

            saveCurrentQuestion();

            parser.currentSection = getSection(line);

            parser.currentMarks =
                SECTION_MARKS[parser.currentSection];

            return;

        }

        //-------------------------------------------------
        // Marks
        //-------------------------------------------------

        let m = getMarks(line);

        if(m !== null){

            parser.currentMarks = m;

        }

        //-------------------------------------------------
        // New Question
        //-------------------------------------------------

        if(isQuestion(line)){

            saveCurrentQuestion();

            currentQuestion = {

                subject: parser.subject,

                chapter: parser.currentChapter,

                section: parser.currentSection,

                marks: parser.currentMarks,

                type: getQuestionType(line),

                difficulty: getDifficulty(line),

                question: cleanQuestion(line)

            };

            return;

        }

        //-------------------------------------------------
        // Continue Previous Question
        //-------------------------------------------------

        if(currentQuestion){

            currentQuestion.question +=
                " " + line;

        }

    });

}
/*=========================================================
Universal Parser
Part 5 : OR, Subparts & Case Study Detection
=========================================================*/

//=========================================================
// Detect OR
//=========================================================

function isOR(line){

    line=line.trim().toUpperCase();

    return line==="OR";

}

//=========================================================
// Detect Subparts
// a)
// b)
// c)
//=========================================================

function isSubPart(line){

    return /^[a-zA-Z][.)]/.test(line);

}

//=========================================================
// Detect Assertion Reason
//=========================================================

function isAssertionReason(line){

    const text=line.toLowerCase();

    return (

        text.includes("assertion") &&

        text.includes("reason")

    );

}

//=========================================================
// Detect Case Study
//=========================================================

function isCaseStudy(line){

    const text=line.toLowerCase();

    return (

        text.includes("case study") ||

        text.includes("read the passage") ||

        text.includes("study the following") ||

        text.includes("read the following passage")

    );

}
