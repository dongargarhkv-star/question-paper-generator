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


    generateData.blueprint=

        JSON.parse(

            localStorage.getItem("blueprint")

        );


    displayPaperDetails();


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

//=========================================================
// Generate Paper
//=========================================================

function generatePaper(){


    generateData.paper=[];


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



        let selected=

            available.slice(0,item.count);



        generateData.paper.push(

            ...selected

        );


    });



    displayPaper();


    localStorage.setItem(

        "generatedPaper",

        JSON.stringify(

            generateData.paper

        )

    );


}



//=========================================================
// Display Paper
//=========================================================

function displayPaper(){


    let html="";


    generateData.paper.forEach(function(q,index){


        html+=`

<div class="card mb-2">

<div class="card-body">


<b>

Q${index+1}.

</b>

${q.question}


<br>

<small>

(${q.marks} Marks)

</small>


</div>

</div>


`;


    });



    document.getElementById(

        "paperPreview"

    ).innerHTML=html;


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
