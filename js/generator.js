/*=========================================================
AI Question Paper Generator v2.0
Question Paper Generator
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Generator Object
//=========================================================

let generator={

    questionBank:[],

    blueprint:null,

    selectedQuestions:[],

    generatedPaper:[],

    duplicates:0,

    totalMarks:0,

    totalQuestions:0

};

//=========================================================
// Initialize Generator
//=========================================================

function initializeGenerator(){

    console.log("================================");

    console.log("Question Paper Generator");

    console.log("Initializing...");

    console.log("================================");

    loadGeneratorData();

    updateGeneratorSummary();

    registerGeneratorEvents();

}

//=========================================================
// Load Required Data
//=========================================================

function loadGeneratorData(){

    //-------------------------------------------------
    // Question Bank
    //-------------------------------------------------

    generator.questionBank=

        loadQuestionBank();

    //-------------------------------------------------
    // Blueprint
    //-------------------------------------------------

    generator.blueprint=

        JSON.parse(

            localStorage.getItem("blueprint")

        );

    if(!generator.blueprint){

        generatorMessage(

            "No Blueprint Found.",

            "error"

        );

        return;

    }

    //-------------------------------------------------
    // Information
    //-------------------------------------------------

    generatorMessage(

        "Question Bank Loaded : "

        + generator.questionBank.length,

        "success"

    );

    generatorMessage(

        "Blueprint Loaded.",

        "success"

    );

}

//=========================================================
// Update Summary
//=========================================================

function updateGeneratorSummary(){

    document.getElementById(

        "totalGeneratedQuestions"

    ).textContent=

        generator.totalQuestions;

    document.getElementById(

        "generatedMarks"

    ).textContent=

        generator.totalMarks;

    document.getElementById(

        "duplicateCount"

    ).textContent=

        generator.duplicates;

    document.getElementById(

        "generatorStatus"

    ).textContent=

        "Ready";

}
/*=========================================================
AI Question Paper Generator v2.0
Question Paper Generator
Part 2 : Question Selection Engine
=========================================================*/

//=========================================================
// Generate Paper
//=========================================================

function generatePaper(){

    //-------------------------------------------------
    // Reset
    //-------------------------------------------------

    generator.selectedQuestions=[];

    generator.generatedPaper=[];

    generator.duplicates=0;

    generator.totalMarks=0;

    generator.totalQuestions=0;

    //-------------------------------------------------
    // Read Blueprint
    //-------------------------------------------------

    const blueprintData=

        generator.blueprint.blueprintData;

    blueprintData.forEach(function(item){

        selectQuestions(

            item.chapter,

            item.marks,

            item.count

        );

    });

    //-------------------------------------------------
    // Build Paper
    //-------------------------------------------------

    generator.generatedPaper=

        generator.selectedQuestions;

    generator.totalQuestions=

        generator.generatedPaper.length;

    generator.totalMarks=

        generator.generatedPaper.reduce(

            (sum,q)=>sum+Number(q.marks),

            0

        );

    updateGeneratorSummary();

    renderGeneratedPaper();

    generatorMessage(

        "Question Paper Generated Successfully.",

        "success"

    );

}

//=========================================================
// Select Questions
//=========================================================

function selectQuestions(

    chapter,

    marks,

    count

){

    //-------------------------------------------------
    // Filter
    //-------------------------------------------------

    let available=

        generator.questionBank.filter(function(q){

            return(

                q.chapter===chapter &&

                Number(q.marks)===Number(marks)

            );

        });

    //-------------------------------------------------
    // Shuffle
    //-------------------------------------------------

    available.sort(function(){

        return Math.random()-0.5;

    });

    //-------------------------------------------------
    // Pick Questions
    //-------------------------------------------------

    let selected=0;

    for(let i=0;

        i<available.length &&

        selected<count;

        i++){

        if(

            !alreadySelected(

                available[i]

            )

        ){

            generator.selectedQuestions.push(

                available[i]

            );

            selected++;

        }

        else{

            generator.duplicates++;

        }

    }

}

//=========================================================
// Duplicate Check
//=========================================================

function alreadySelected(question){

    return generator.selectedQuestions.some(

        function(q){

            return(

                q.question===question.question

            );

        }

    );

}
/*=========================================================
AI Question Paper Generator v2.0
Question Paper Generator
Part 3 : Paper Rendering
=========================================================*/

//=========================================================
// Render Generated Paper
//=========================================================

function renderGeneratedPaper(){

    const preview=document.getElementById(

        "generatedPaper"

    );

    if(!preview)
        return;

    //--------------------------------------------
    // Load Paper Details
    //--------------------------------------------

    loadPaperDetails();

    //--------------------------------------------
    // Empty Paper
    //--------------------------------------------

    if(generator.generatedPaper.length===0){

        preview.innerHTML=`

<div class="alert alert-warning">

No questions generated.

</div>

`;

        return;

    }

    //--------------------------------------------
    // Sort Questions
    //--------------------------------------------

    generator.generatedPaper.sort(function(a,b){

        if(a.section===b.section){

            return Number(a.marks)-Number(b.marks);

        }

        return a.section.localeCompare(b.section);

    });

    //--------------------------------------------
    // Render
    //--------------------------------------------

    let html="";

    let currentSection="";

    let questionNo=1;

    generator.generatedPaper.forEach(function(q){

        //----------------------------------------
        // New Section
        //----------------------------------------

        if(currentSection!==q.section){

            currentSection=q.section;

            html+=`

<hr>

<h4>

SECTION ${currentSection}

</h4>

`;

        }

        //----------------------------------------
        // Question
        //----------------------------------------

        html+=`

<div class="mb-4">

<p>

<b>

Q${questionNo}.

</b>

${q.question}

</p>

<div class="text-end">

<b>

(${q.marks} Marks)

</b>

</div>

</div>

`;

        questionNo++;

    });

    preview.innerHTML=html;

}

//=========================================================
// Load Paper Details
//=========================================================

function loadPaperDetails(){

    if(!generator.blueprint)
        return;

    const settings=

        generator.blueprint.paperSettings;

    document.getElementById(

        "paperClass"

    ).textContent=

        settings.className;

    document.getElementById(

        "paperDuration"

    ).textContent=

        settings.duration;

    document.getElementById(

        "paperMarks"

    ).textContent=

        settings.maximumMarks;

    document.getElementById(

        "examTitle"

    ).textContent=

        settings.examName;

    document.getElementById(

        "subjectTitle"

    ).textContent=

        settings.subject;

    document.getElementById(

        "paperInstructions"

    ).innerHTML=

        "<pre style='white-space:pre-wrap;font-family:inherit;'>"

        +

        settings.instructions

        +

        "</pre>";

}
/*=========================================================
AI Question Paper Generator v2.0
Question Paper Generator
Part 4 : Controls & Events
=========================================================*/

//=========================================================
// Register Events
//=========================================================

function registerGeneratorEvents(){

    //-------------------------------------------------
    // Generate Paper
    //-------------------------------------------------

    document.getElementById(

        "generatePaperBtn"

    ).addEventListener(

        "click",

        generatePaper

    );

    //-------------------------------------------------
    // Regenerate Paper
    //-------------------------------------------------

    document.getElementById(

        "regeneratePaperBtn"

    ).addEventListener(

        "click",

        regeneratePaper

    );

    //-------------------------------------------------
    // Save Paper
    //-------------------------------------------------

    document.getElementById(

        "savePaperBtn"

    ).addEventListener(

        "click",

        saveGeneratedPaper

    );

    //-------------------------------------------------
    // Print
    //-------------------------------------------------

    document.getElementById(

        "printPaperBtn"

    ).addEventListener(

        "click",

        printGeneratedPaper

    );

}

//=========================================================
// Regenerate
//=========================================================

function regeneratePaper(){

    generatorMessage(

        "Generating a new random paper...",

        "info"

    );

    generatePaper();

}

//=========================================================
// Save Generated Paper
//=========================================================

function saveGeneratedPaper(){

    localStorage.setItem(

        "generatedPaper",

        JSON.stringify(

            generator.generatedPaper

        )

    );

    generatorMessage(

        "Question Paper Saved Successfully.",

        "success"

    );

}

//=========================================================
// Print Paper
//=========================================================

function printGeneratedPaper(){

    window.print();

    generatorMessage(

        "Print command sent.",

        "success"

    );

}

//=========================================================
// Generator Console
//=========================================================

function generatorMessage(message,type="info"){

    const consoleBox=document.getElementById(

        "generatorConsole"

    );

    if(!consoleBox)
        return;

    const colors={

        success:"green",

        error:"red",

        warning:"orange",

        info:"black"

    };

    consoleBox.innerHTML += `

<div style="color:${colors[type]}">

${message}

</div>

`;

    consoleBox.scrollTop=

        consoleBox.scrollHeight;

}
/*=========================================================
AI Question Paper Generator v2.0
Question Paper Generator
Part 5 : Finalization
=========================================================*/

//=========================================================
// Generator Information
//=========================================================

function getGeneratorInfo(){

    return{

        totalQuestions:generator.totalQuestions,

        totalMarks:generator.totalMarks,

        duplicates:generator.duplicates,

        questionBankSize:generator.questionBank.length,

        blueprintItems:

            generator.blueprint

            ? generator.blueprint.blueprintData.length

            :0

    };

}

//=========================================================
// Print Summary
//=========================================================

function printGeneratorSummary(){

    console.log("================================");

    console.log("Generator Summary");

    console.table(

        getGeneratorInfo()

    );

    console.log("================================");

}

//=========================================================
// Reload Generator
//=========================================================

function reloadGenerator(){

    loadGeneratorData();

    updateGeneratorSummary();

    generator.generatedPaper=[];

    generator.selectedQuestions=[];

    renderGeneratedPaper();

    printGeneratorSummary();

}

//=========================================================
// Check Dependencies
//=========================================================

function generatorReady(){

    return(

        typeof loadQuestionBank==="function"

    );

}

//=========================================================
// Startup
//=========================================================

if(generatorReady()){

    console.log(

        "Generator Module Loaded Successfully."

    );

}

else{

    console.warn(

        "Generator Module Waiting for Storage..."

    );

}
