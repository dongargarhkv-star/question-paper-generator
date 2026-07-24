/*=========================================================
AI Question Paper Generator v2.0
Core Application
Developer : Amit Yerpude
=========================================================*/

"use strict";

//=========================================================
// Application Object
//=========================================================

const App = {

    name: "AI Question Paper Generator",

    version: "2.0",

    developer: "Amit Yerpude",

    school: "PM SHRI Kendriya Vidyalaya Dongargarh"

};

//=========================================================
// Storage Keys
//=========================================================

const STORAGE = {

    SUBJECT: "aqpg_subject",

    CLASS: "aqpg_class",

    QUESTIONBANK: "aqpg_questionbank",

    BLUEPRINT: "aqpg_blueprint",

    GENERATED: "aqpg_generatedpaper",

    SETTINGS: "aqpg_settings"

};

//=========================================================
// Save Data
//=========================================================

function saveData(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

//=========================================================
// Load Data
//=========================================================

function loadData(key){

    const data = localStorage.getItem(key);

    if(!data)

        return null;

    return JSON.parse(data);

}

//=========================================================
// Remove Data
//=========================================================

function removeData(key){

    localStorage.removeItem(key);

}

//=========================================================
// Clear Complete Database
//=========================================================

function clearDatabase(){

    if(confirm("Delete all stored data?")){

        localStorage.clear();

        alert("Database Cleared.");

        location.reload();

    }

}

//=========================================================
// Status Message
//=========================================================

function showStatus(message,type="success"){

    const box=document.getElementById("status");

    if(!box) return;

    box.innerHTML=

        `<div class="alert alert-${type}">${message}</div>`;

}

//=========================================================
// Save Subject
//=========================================================

function saveSubject(){

    const subject=document.getElementById("subject");

    if(!subject) return;

    saveData(

        STORAGE.SUBJECT,

        subject.value

    );

}

//=========================================================
// Save Class
//=========================================================

function saveClass(){

    const cls=document.getElementById("class");

    if(!cls) return;

    saveData(

        STORAGE.CLASS,

        cls.value

    );

}

//=========================================================
// Load Subject/Class
//=========================================================

function restoreSelections(){

    const subject=document.getElementById("subject");

    const cls=document.getElementById("class");

    const savedSubject=loadData(STORAGE.SUBJECT);

    const savedClass=loadData(STORAGE.CLASS);

    if(subject && savedSubject)

        subject.value=savedSubject;

    if(cls && savedClass)

        cls.value=savedClass;

}

//=========================================================
// Database Statistics
//=========================================================

function databaseInfo(){

    const qb=

    loadData(STORAGE.QUESTIONBANK) || [];

    console.log("================================");

    console.log(App.name);

    console.log("Version :",App.version);

    console.log("Questions :",qb.length);

    console.log("================================");

}

//=========================================================
// Get Question Bank
//=========================================================

function getQuestionBank(){

    return loadData(STORAGE.QUESTIONBANK) || [];

}

//=========================================================
// Save Question Bank
//=========================================================

function saveQuestionBank(qb){

    saveData(

        STORAGE.QUESTIONBANK,

        qb

    );

}

//=========================================================
// Initialize Application
//=========================================================

window.addEventListener("DOMContentLoaded",()=>{

    restoreSelections();

    databaseInfo();

    const subject=document.getElementById("subject");

    const cls=document.getElementById("class");

    if(subject)

        subject.addEventListener(

            "change",

            saveSubject

        );

    if(cls)

        cls.addEventListener(

            "change",

            saveClass

        );

});
//=========================================================
// Reset Application
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

        App.name +

        "\n\nVersion : " +

        App.version +

        "\nDeveloper : " +

        App.developer

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
// Promise Error Handler
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
// Before Closing
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
// Export Functions
//=========================================================

window.App=App;

window.STORAGE=STORAGE;

window.saveData=saveData;

window.loadData=loadData;

window.removeData=removeData;

window.clearDatabase=clearDatabase;

window.showStatus=showStatus;

window.getQuestionBank=getQuestionBank;

window.saveQuestionBank=saveQuestionBank;
window.resetApplication = resetApplication;

window.showApplicationVersion = showApplicationVersion;

