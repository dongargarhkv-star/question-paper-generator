/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Blueprint Object
//=========================================================

let blueprint={

    questionBank:[],

    chapters:[],

    blueprintData:[],

    totalQuestions:0,

    totalMarks:0

};

//=========================================================
// Initialize Blueprint
//=========================================================

function initializeBlueprint(){

    console.log("================================");

    console.log("Blueprint Designer");

    console.log("Initializing...");

    console.log("================================");

    loadBlueprintData();

    buildBlueprintTable();

    updateBlueprintSummary();

    registerBlueprintEvents();

}

//=========================================================
// Load Question Bank
//=========================================================

function loadBlueprintData(){

    blueprint.questionBank=

        loadQuestionBank();

    blueprint.chapters=

        loadChapters();

    console.log(

        "Questions :",

        blueprint.questionBank.length

    );

    console.log(

        "Chapters :",

        blueprint.chapters.length

    );

}

//=========================================================
// Available Questions
//=========================================================

function getAvailableQuestions(chapter,marks){

    return blueprint.questionBank.filter(function(q){

        return(

            q.chapter===chapter &&

            Number(q.marks)===Number(marks)

        );

    }).length;

}
/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 2 : Build Blueprint Table
=========================================================*/

//=========================================================
// Build Table
//=========================================================

function buildBlueprintTable(){

    const tbody = document.getElementById(

        "blueprintTableBody"

    );

    if(!tbody)
        return;

    tbody.innerHTML = "";

    //-------------------------------------------------
    // No Chapters
    //-------------------------------------------------

    if(blueprint.chapters.length===0){

        tbody.innerHTML = `

<tr>

<td colspan="11" class="text-center text-danger">

No Question Bank Found

</td>

</tr>

`;

        return;

    }

    //-------------------------------------------------
    // Create One Row Per Chapter
    //-------------------------------------------------

    blueprint.chapters.forEach(function(chapter){

        tbody.appendChild(

            createBlueprintRow(chapter)

        );

    });

}

//=========================================================
// Create Row
//=========================================================

function createBlueprintRow(chapter){

    const tr=document.createElement("tr");

    //-------------------------------------------------
    // Chapter Name
    //-------------------------------------------------

    let html=`

<td>

<b>${chapter}</b>

</td>

`;

    //-------------------------------------------------
    // Required Questions (Editable)
    //-------------------------------------------------

    for(let marks=1; marks<=5; marks++){

        html += `

<td>

<input
type="number"
class="form-control text-center blueprint-input"
min="0"
value="0"

data-chapter="${chapter}"
data-marks="${marks}">

</td>

`;

    }

    //-------------------------------------------------
    // Available Questions (Read Only)
    //-------------------------------------------------

    for(let marks=1; marks<=5; marks++){

        html += `

<td class="text-center">

<span
class="badge bg-success">

${getAvailableQuestions(chapter,marks)}

</span>

</td>

`;

    }

    tr.innerHTML=html;

    return tr;

}
/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 3 : Read Blueprint & Summary
=========================================================*/

//=========================================================
// Read Blueprint Table
//=========================================================

function readBlueprintTable(){

    blueprint.blueprintData=[];

    blueprint.totalQuestions=0;

    blueprint.totalMarks=0;

    document

        .querySelectorAll(".blueprint-input")

        .forEach(function(input){

            const chapter=input.dataset.chapter;

            const marks=Number(input.dataset.marks);

            const count=Number(input.value);

            if(count<=0)
                return;

            blueprint.blueprintData.push({

                chapter:chapter,

                marks:marks,

                count:count

            });

            blueprint.totalQuestions += count;

            blueprint.totalMarks +=

                (marks * count);

        });

}

//=========================================================
// Update Summary
//=========================================================

function updateBlueprintSummary(){

    readBlueprintTable();

    document.getElementById(

        "bpTotalQuestions"

    ).textContent=

        blueprint.totalQuestions;

    document.getElementById(

        "bpTotalMarks"

    ).textContent=

        blueprint.totalMarks;

    document.getElementById(

        "bpTotalChapters"

    ).textContent=

        blueprint.chapters.length;

    document.getElementById(

        "summaryQuestions"

    ).textContent=

        blueprint.totalQuestions;

    document.getElementById(

        "summaryMarks"

    ).textContent=

        blueprint.totalMarks;

    document.getElementById(

        "summaryChapters"

    ).textContent=

        blueprint.chapters.length;

}

//=========================================================
// Live Update
//=========================================================

function registerBlueprintEvents(){

    document

        .addEventListener(

            "input",

            function(event){

                if(

                    event.target.classList.contains(

                        "blueprint-input"

                    )

                ){

                    updateBlueprintSummary();

                }

            }

        );

}
/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 4 : Validation Engine
=========================================================*/

//=========================================================
// Validate Blueprint
//=========================================================

function validateBlueprint(){

    readBlueprintTable();

    let valid = true;

    let messages = [];

    blueprint.blueprintData.forEach(function(item){

        const available = getAvailableQuestions(

            item.chapter,

            item.marks

        );

        if(item.count > available){

            valid = false;

            messages.push(

                `${item.chapter} (${item.marks} Mark): Required ${item.count}, Available ${available}`

            );

        }

    });

    //-------------------------------------------------
    // Empty Blueprint
    //-------------------------------------------------

    if(blueprint.totalQuestions===0){

        valid=false;

        messages.push(

            "Blueprint contains no questions."

        );

    }

    //-------------------------------------------------
    // Update Status
    //-------------------------------------------------

    document.getElementById(

        "bpStatus"

    ).textContent =

        valid ? "Valid" : "Invalid";

    document.getElementById(

        "bpStatus"

    ).className =

        valid

        ? "text-success"

        : "text-danger";

    //-------------------------------------------------
    // Validation Panel
    //-------------------------------------------------

    const panel=document.getElementById(

        "validationStatus"

    );

    if(valid){

        panel.innerHTML=`

<div class="alert alert-success mb-0">

✔ Blueprint is valid.

</div>

`;

    }

    else{

        let html=`

<div class="alert alert-danger">

<b>Validation Failed</b>

<ul class="mb-0">

`;

        messages.forEach(function(msg){

            html += `<li>${msg}</li>`;

        });

        html += `

</ul>

</div>

`;

        panel.innerHTML=html;

    }

    return valid;

}

//=========================================================
// Console Message
//=========================================================

function blueprintMessage(message,type="info"){

    const consoleBox=document.getElementById(

        "blueprintConsole"

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
Blueprint Designer
Part 5 : Save, Load & Reset
=========================================================*/

//=========================================================
// Save Blueprint
//=========================================================

function saveBlueprint(){

    readBlueprintTable();

    const blueprintObject={

        paperSettings:{

            className:

                document.getElementById("className").value,

            subject:

                document.getElementById("subjectName").value,

            examName:

                document.getElementById("examName").value,

            session:

                document.getElementById("session").value,

            duration:

                document.getElementById("duration").value,

            maximumMarks:Number(

                document.getElementById("maximumMarks").value

            ),

            instructions:

                document.getElementById("instructions").value

        },

        blueprintData:

            blueprint.blueprintData

    };

    localStorage.setItem(

        "blueprint",

        JSON.stringify(blueprintObject)

    );

    blueprintMessage(

        "✔ Blueprint Saved Successfully.",

        "success"

    );
    let btn=document.getElementById(
"generatePaperBtn"
);

if(btn){

    btn.disabled=false;

}

}

//=========================================================
// Load Blueprint
//=========================================================

function loadBlueprint(){

    const data=JSON.parse(

        localStorage.getItem("blueprint")

    );

    if(!data){

        blueprintMessage(

            "No Saved Blueprint Found.",

            "warning"

        );

        return;

    }

    //-------------------------------------------------
    // Paper Settings
    //-------------------------------------------------

    document.getElementById("className").value=

        data.paperSettings.className;

    document.getElementById("subjectName").value=

        data.paperSettings.subject;

    document.getElementById("examName").value=

        data.paperSettings.examName;

    document.getElementById("session").value=

        data.paperSettings.session;

    document.getElementById("duration").value=

        data.paperSettings.duration;

    document.getElementById("maximumMarks").value=

        data.paperSettings.maximumMarks;

    document.getElementById("instructions").value=

        data.paperSettings.instructions;

    //-------------------------------------------------
    // Clear Existing Inputs
    //-------------------------------------------------

    document.querySelectorAll(

        ".blueprint-input"

    ).forEach(function(input){

        input.value=0;

    });

    //-------------------------------------------------
    // Restore Blueprint
    //-------------------------------------------------

    data.blueprintData.forEach(function(item){

        const input=document.querySelector(

            `.blueprint-input[data-chapter="${item.chapter}"][data-marks="${item.marks}"]`

        );

        if(input){

            input.value=item.count;

        }

    });

    updateBlueprintSummary();

    blueprintMessage(

        "✔ Blueprint Loaded Successfully.",

        "success"

    );

}

//=========================================================
// Reset Blueprint
//=========================================================

function resetBlueprint(){

    if(

        !confirm(

            "Reset the current blueprint?"

        )

    ){

        return;

    }

    document.querySelectorAll(

        ".blueprint-input"

    ).forEach(function(input){

        input.value=0;

    });

    updateBlueprintSummary();

    document.getElementById(

        "validationStatus"

    ).innerHTML=

        "Blueprint reset.";

    blueprintMessage(

        "Blueprint Reset.",

        "warning"

    );

}
/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 6 : Events & Paper Generation
=========================================================*/

//=========================================================
// Register Events
//=========================================================

function registerBlueprintEvents(){

    //-------------------------------------------------
    // Live Calculation
    //-------------------------------------------------

    document.addEventListener(

        "input",

        function(e){

            if(

                e.target.classList.contains(

                    "blueprint-input"

                )

            ){

                updateBlueprintSummary();

            }

        }

    );

    //-------------------------------------------------
    // Buttons
    //-------------------------------------------------

    document.getElementById(

        "validateBlueprintBtn"

    ).addEventListener(

        "click",

        validateBlueprint

    );

    document.getElementById(

        "saveBlueprintBtn"

    ).addEventListener(

        "click",

        saveBlueprint

    );

    document.getElementById(

        "loadBlueprintBtn"

    ).addEventListener(

        "click",

        loadBlueprint

    );

    document.getElementById(

        "resetBlueprintBtn"

    ).addEventListener(

        "click",

        resetBlueprint

    );

    document.getElementById(

        "generatePaperBtn"

    ).addEventListener(

        "click",

        generateQuestionPaper

    );

}

//=========================================================
// Generate Question Paper
//=========================================================

function generateQuestionPaper(){

    //-------------------------------------------------
    // Validate First
    //-------------------------------------------------

    if(!validateBlueprint()){

        blueprintMessage(

            "Cannot generate paper. Blueprint is invalid.",

            "error"

        );

        return;

    }

    //-------------------------------------------------
    // Save Blueprint
    //-------------------------------------------------

    saveBlueprint();

    //-------------------------------------------------
    // Redirect
    //-------------------------------------------------

    blueprintMessage(

        "Opening Question Paper Generator...",

        "success"

    );

    window.location.href="generator.html";

}
/*=========================================================
AI Question Paper Generator v2.0
Blueprint Designer
Part 7 : Finalization
=========================================================*/

//=========================================================
// Blueprint Information
//=========================================================

function getBlueprintInfo(){

    return{

        totalQuestions: blueprint.totalQuestions,

        totalMarks: blueprint.totalMarks,

        totalChapters: blueprint.chapters.length,

        blueprintItems: blueprint.blueprintData.length

    };

}

//=========================================================
// Print Summary
//=========================================================

function printBlueprintSummary(){

    console.log("================================");

    console.log("Blueprint Summary");

    console.table(getBlueprintInfo());

    console.log("================================");

}

//=========================================================
// Reload Blueprint
//=========================================================

function reloadBlueprint(){

    loadBlueprintData();

    buildBlueprintTable();

    updateBlueprintSummary();

    printBlueprintSummary();

}

//=========================================================
// Check Dependencies
//=========================================================

function blueprintReady(){

    return(

        typeof loadQuestionBank==="function" &&

        typeof loadChapters==="function"

    );

}

//=========================================================
// Startup
//=========================================================

if(blueprintReady()){

    console.log("Blueprint Module Loaded Successfully.");

}else{

    console.warn(

        "Blueprint Module Waiting for Storage..."

    );

}
