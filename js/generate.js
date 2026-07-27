/*=========================================================
AI Question Paper Generator v2.0
Generate Question Paper
=========================================================*/

"use strict";


//=========================================================
// Load Data
//=========================================================

let generateData={

    questionBank:[],

    blueprint:{},

    paper:[]

};

generateData.duplicates = 0;
//=========================================================
// Initialize
//=========================================================

function initializeGenerator(){


    console.log("================================");

    console.log("Question Paper Generator");

    console.log("Initializing...");

    console.log("================================");


    generateData.questionBank=

        loadQuestionBank();


    generateData.blueprint = loadBlueprint();


    //displayPaperDetails();
   // displayHeader();


    registerGenerateEvents();


}



//=========================================================
// Display Paper Details
//=========================================================

function displayPaperDetails(){


    if(!generateData.blueprint)
        return;


    const settings=

        generateData.blueprint.paperSettings;


    document.getElementById(

        "paperDetails"

    ).innerHTML=`

<h5>

${settings.examName}

</h5>

<p>

<b>Class:</b> ${settings.className}

<br>

<b>Subject:</b> ${settings.subject}

<br>

<b>Maximum Marks:</b> ${settings.maximumMarks}

<br>

<b>Duration:</b> ${settings.duration}

</p>

`;

}

//=========================================================
// Display Header
//=========================================================

/*function displayHeader(){


    if(!generateData.blueprint)
        return;


    const settings=

        generateData.blueprint.paperSettings;



    document.getElementById(

        "examTitle"

    ).innerHTML=

        settings.examName;



    document.getElementById(

        "subjectTitle"

    ).innerHTML=

        settings.subject;



    document.getElementById(

        "instructionBox"

    ).innerHTML=

`
<div class="alert alert-secondary">

<b>General Instructions:</b>

<br>

${settings.instructions.replace(/\n/g,"<br>")}

</div>
`;

}*/
function alreadySelected(question){

    return generateData.paper.some(function(q){

        return q.question===question.question;

    });

}
//=========================================================
// Generate Paper
//=========================================================

function generatePaper(){


    generateData.paper=[];
    generateData.duplicates = 0;

    const blueprintData=

        generateData.blueprint.blueprintData;



    blueprintData.forEach(function(item){


        let available=

            generateData.questionBank.filter(function(q){


                return(

                    q.chapter===item.chapter &&

                    Number(q.marks)===Number(item.marks)

                );


            });



        available.sort(function(){

    return Math.random()-0.5;

});

let selected = 0;

for(let i=0;

    i<available.length &&

    selected<item.count;

    i++){

    if(!alreadySelected(available[i])){

        generateData.paper.push(

            available[i]

        );

        selected++;

    }

    else{

        generateData.duplicates++;

    }

}


    });



    displayPaper();


    saveGeneratedPaper(generateData.paper);


}
//=========================================================
// Display Paper
//=========================================================


function displayPaper(){

    generateData.paper.sort(function(a,b){

        if(a.section===b.section){

            return Number(a.marks)-Number(b.marks);

        }

        return a.section.localeCompare(b.section);

    });

    const settings = generateData.blueprint.paperSettings;

    let html = `

<div class="paper-container" style="width:100%;">

<h2 class="text-center mb-2">

${settings.schoolName}

</h2>

<h3 class="text-center mb-2">

${settings.examName}

</h3>

<h4 class="text-center mb-4">

Question Paper

</h4>

<table class="table table-borderless mb-3">

<tr>

<td><b>Class :</b> ${settings.className}</td>

<td class="text-end"><b>Subject :</b> ${settings.subject}</td>

</tr>

<tr>

<td><b>Time :</b> ${settings.duration}</td>

<td class="text-end"><b>Maximum Marks :</b> ${settings.maximumMarks}</td>

</tr>

</table>

<hr>

<h5>

GENERAL INSTRUCTIONS

</h5>

<ol>

${settings.instructions
.split("\n")
.filter(line => line.trim() !== "")
.map(line => `<li>${line}</li>`)
.join("")}

</ol>

<hr>

`;

    let currentSection = "";

    let questionNumber = 1;

    generateData.paper.forEach(function(q){

        if(q.section !== currentSection){

            currentSection = q.section;

            html += `

<div class="mt-4">

<h4 class="text-center">

SECTION ${currentSection}

</h4>

<hr>

</div>

`;

        }

        html += `

<div class="question-block mb-3">

<div class="d-flex justify-content-between">

<div>

<b>Q.${questionNumber}</b>

&nbsp;

${q.question}

</div>

<div>

<b>(${q.marks})</b>

</div>

</div>

</div>

`;

        questionNumber++;

    });

    html += `

</div>

`;

    document.getElementById("questionArea").innerHTML = html;

}


//=========================================================
// Apply Print Layout
//=========================================================

function applyPrintLayout(){

    let style = document.getElementById("printStyle");

    if(style){

        style.remove();

    }

    style = document.createElement("style");

    style.id = "printStyle";

    style.innerHTML = `

@page{

    size:A4;

    margin:18mm;

}

@media print{

    body{

        background:white !important;

    }

    nav,
    header,
    footer,
    .navbar,
    .sidebar,
    .btn,
    #generateBtn,
    #printBtn{

        display:none !important;

    }

    #questionArea{

        width:100%;

        margin:0;

        padding:0;

        background:white;

    }

    .paper-container{

        width:100%;

        margin:0;

        padding:0;

        page-break-after:auto;

    }

    .question-block{

        page-break-inside:avoid;

    }

    h2,h3,h4,h5{

        page-break-after:avoid;

    }

}

`;

    document.head.appendChild(style);

}
//=========================================================
// Print Question Paper
//=========================================================

function printGeneratedPaper(){

    applyPrintLayout();

    window.print();

}

//=========================================================
// Events
//=========================================================

function registerGenerateEvents(){

    document.getElementById(

        "generateBtn"

    ).addEventListener(

        "click",

        generatePaper

    );

    document.getElementById(

        "printBtn"

    ).addEventListener(

        "click",

        printGeneratedPaper

    );

}
//=========================================================
// Startup
//=========================================================


document.addEventListener(

"DOMContentLoaded",

function(){

    initializeGenerator();

}

);
