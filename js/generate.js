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


    displayPaperDetails();
    displayHeader();


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

function displayHeader(){


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

}
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

<div class="paper-container">

<div class="paper-header">

<h2 class="text-center mb-2">

${document.getElementById("schoolName").textContent.trim()}

</h2>

<h3 class="text-center mb-3">

${settings.examName}

</h3>

<h4 class="text-center mb-4">

Question Paper

</h4>

<table class="table table-borderless mb-3">

<tr>

<td><b>Class :</b> ${settings.className}</td>

<td class="text-center"><b>Subject :</b> ${settings.subject}</td>

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
.filter(x=>x.trim()!=="")
.map(x=>`<li>${x}</li>`)
.join("")}

</ol>

<hr>

</div>

`;

    let currentSection = "";

    let questionNumber = 1;

    generateData.paper.forEach(function(q){

        if(q.section!==currentSection){

            currentSection=q.section;

            html+=`

<div class="mt-4 mb-3">

<h4 class="text-center">

SECTION ${currentSection}

</h4>

<hr>

</div>

`;

        }

        html+=`

<div class="question-block mb-4">

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
// Print Question Paper
//=========================================================

function printGeneratedPaper(){

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
