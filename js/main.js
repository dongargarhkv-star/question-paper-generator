/*=========================================================
AI Question Paper Generator v2.0
Main Application Controller
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Application
//=========================================================

const APP = {

    version : "2.0",

    name : "AI Question Paper Generator",

    initialized : false

};

//=========================================================
// Start Application
//=========================================================

function initializeApplication(){

    console.log("================================");
    console.log(APP.name);
    console.log("Version :",APP.version);
    console.log("================================");

    initializeStorage();

    APP.initialized=true;

    detectCurrentPage();

}

//=========================================================
// Detect Current Page
//=========================================================

function detectCurrentPage(){

    const page=location.pathname

        .split("/")

        .pop()

        .toLowerCase();

    switch(page){

        case "importer.html":

            if(typeof initializeImporter==="function")
                initializeImporter();

            break;

        case "manager.html":

            if(typeof initializeManager==="function")
                initializeManager();

            break;

        case "blueprint.html":

            if(typeof initializeBlueprint==="function")
                initializeBlueprint();

            break;

        case "generator.html":

            if(typeof initializeGenerator==="function")
                initializeGenerator();

            break;

        default:

            console.log("Home Page Loaded.");

    }

}

//=========================================================
// Application Ready
//=========================================================

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);
/*=========================================================
AI Question Paper Generator v2.0
Main Application Controller
Part 2 : Application Utilities
=========================================================*/

//=========================================================
// Application Information
//=========================================================

function getApplicationInfo(){

    return{

        name:APP.name,

        version:APP.version,

        initialized:APP.initialized

    };

}

//=========================================================
// Storage Information
//=========================================================

function getStorageInfo(){

    let questionBank=[];

    let blueprint=null;

    let generatedPaper=[];

    try{

        questionBank=loadQuestionBank();

    }catch(e){}

    try{

        blueprint=JSON.parse(

            localStorage.getItem("blueprint")

        );

    }catch(e){}

    try{

        generatedPaper=JSON.parse(

            localStorage.getItem(

                "generatedPaper"

            )

        ) || [];

    }catch(e){}

    return{

        questions:questionBank.length,

        blueprint:

            blueprint?1:0,

        generatedPapers:

            generatedPaper.length

    };

}

//=========================================================
// Clear Console
//=========================================================

function clearApplicationConsole(){

    console.clear();

    console.log(APP.name);

    console.log("Version :",APP.version);

}

//=========================================================
// Reload Current Page
//=========================================================

function reloadApplication(){

    location.reload();

}
/*=========================================================
AI Question Paper Generator v2.0
Main Application Controller
Part 3 : Application Health Check
=========================================================*/

//=========================================================
// Run Health Check
//=========================================================

function runHealthCheck(){

    console.log("================================");
    console.log("Application Health Check");
    console.log("================================");

    checkModule(

        "Storage Module",

        typeof initializeStorage==="function"

    );

    checkModule(

        "Importer Module",

        typeof initializeImporter==="function"

    );

    checkModule(

        "Manager Module",

        typeof initializeManager==="function"

    );

    checkModule(

        "Blueprint Module",

        typeof initializeBlueprint==="function"

    );

    checkModule(

        "Generator Module",

        typeof initializeGenerator==="function"

    );

    checkModule(

        "Question Bank",

        typeof loadQuestionBank==="function"

    );

    console.log("================================");

}

//=========================================================
// Module Checker
//=========================================================

function checkModule(name,status){

    if(status){

        console.log("✔ " + name);

    }

    else{

        console.warn("✘ " + name);

    }

}

//=========================================================
// Print Application Status
//=========================================================

function printApplicationStatus(){

    console.log("================================");

    console.table({

        Application:APP.name,

        Version:APP.version,

        Initialized:APP.initialized,

        Page:location.pathname

            .split("/")

            .pop()

    });

    console.log("================================");

}
/*=========================================================
AI Question Paper Generator v2.0
Main Application Controller
Part 4 : Finalization
=========================================================*/

//=========================================================
// Reset Application Data
//=========================================================

function resetApplication(){

    if(!confirm(

        "This will delete all saved data.\nContinue?"

    )){

        return;

    }

    localStorage.clear();

    console.log("================================");
    console.log("Application Reset Completed");
    console.log("================================");

    location.reload();

}

//=========================================================
// Application Version
//=========================================================

function showApplicationVersion(){

    alert(

        APP.name +

        "\n\nVersion : " +

        APP.version

    );

}

//=========================================================
// Global Error Handler
//=========================================================

window.addEventListener(

    "error",

    function(event){

        console.error("================================");
        console.error("Application Error");
        console.error(event.message);
        console.error(event.filename);
        console.error("Line :",event.lineno);
        console.error("================================");

    }

);

//=========================================================
// Unhandled Promise Errors
//=========================================================

window.addEventListener(

    "unhandledrejection",

    function(event){

        console.error(

            "Unhandled Promise Error :",

            event.reason

        );

    }

);

//=========================================================
// Application Shutdown
//=========================================================

window.addEventListener(

    "beforeunload",

    function(){

        console.log(

            "Closing Application..."

        );

    }

);

//=========================================================
// Export APP (Optional)
//=========================================================

window.APP = APP;
