/*=========================================================
AI Question Paper Generator v2.0
Storage Manager
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Storage Keys
//=========================================================

const STORAGE_KEYS={

    QUESTION_BANK:"questionBank",

    CHAPTERS:"chapters",

    BLUEPRINT:"blueprint",

    GENERATED_PAPER:"generatedPaper",

    SETTINGS:"settings"

};

//=========================================================
// Storage Object
//=========================================================

let storage={

    questionBank:[],

    chapters:[],

    blueprint:[],

    generatedPaper:[],

    settings:{}

};

//=========================================================
// Initialize Storage
//=========================================================

function initializeStorage(){

    storage.questionBank=

        loadQuestionBank();

    storage.chapters=

        loadChapters();

    storage.blueprint=

        loadBlueprint();

    storage.generatedPaper=

        loadGeneratedPaper();

    storage.settings=

        loadSettings();

    console.log("================================");

    console.log("Storage Initialized");

    console.log("Questions :",storage.questionBank.length);

    console.log("Chapters :",storage.chapters.length);

    console.log("Blueprint :",storage.blueprint.length);

    console.log("Generated :",storage.generatedPaper.length);

    console.log("================================");

}
/*=========================================================
AI Question Paper Generator v2.0
Storage Manager
Part 2 : Load Functions
=========================================================*/

//=========================================================
// Load Question Bank
//=========================================================

function loadQuestionBank(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.QUESTION_BANK

        )

    ) || [];

}

//=========================================================
// Load Chapters
//=========================================================

function loadChapters(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.CHAPTERS

        )

    ) || [];

}

//=========================================================
// Load Blueprint
//=========================================================

function loadBlueprint(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.BLUEPRINT

        )

    ) || [];

}

//=========================================================
// Load Generated Paper
//=========================================================

function loadGeneratedPaper(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.GENERATED_PAPER

        )

    ) || [];

}

//=========================================================
// Load Settings
//=========================================================

function loadSettings(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.SETTINGS

        )

    ) || {};

}
/*=========================================================
AI Question Paper Generator v2.0
Storage Manager
Part 3 : Save Functions
=========================================================*/

//=========================================================
// Save Question Bank
//=========================================================

function saveQuestionBank(questionBank){

    storage.questionBank = questionBank;

    localStorage.setItem(

        STORAGE_KEYS.QUESTION_BANK,

        JSON.stringify(questionBank)

    );

}

//=========================================================
// Save Chapters
//=========================================================

function saveChapters(chapters){

    storage.chapters = chapters;

    localStorage.setItem(

        STORAGE_KEYS.CHAPTERS,

        JSON.stringify(chapters)

    );

}

//=========================================================
// Save Blueprint
//=========================================================

function saveBlueprint(blueprint){

    storage.blueprint = blueprint;

    localStorage.setItem(

        STORAGE_KEYS.BLUEPRINT,

        JSON.stringify(blueprint)

    );

}

//=========================================================
// Save Generated Paper
//=========================================================

function saveGeneratedPaper(paper){

    storage.generatedPaper = paper;

    localStorage.setItem(

        STORAGE_KEYS.GENERATED_PAPER,

        JSON.stringify(paper)

    );

}

//=========================================================
// Save Settings
//=========================================================

function saveSettings(settings){

    storage.settings = settings;

    localStorage.setItem(

        STORAGE_KEYS.SETTINGS,

        JSON.stringify(settings)

    );

}
/*=========================================================
AI Question Paper Generator v2.0
Storage Manager
Part 4 : Utility Functions
=========================================================*/

//=========================================================
// Clear Question Bank
//=========================================================

function clearQuestionBank(){

    storage.questionBank=[];

    storage.chapters=[];

    localStorage.removeItem(

        STORAGE_KEYS.QUESTION_BANK

    );

    localStorage.removeItem(

        STORAGE_KEYS.CHAPTERS

    );

}

//=========================================================
// Clear Blueprint
//=========================================================

function clearBlueprint(){

    storage.blueprint=[];

    localStorage.removeItem(

        STORAGE_KEYS.BLUEPRINT

    );

}

//=========================================================
// Clear Generated Paper
//=========================================================

function clearGeneratedPaper(){

    storage.generatedPaper=[];

    localStorage.removeItem(

        STORAGE_KEYS.GENERATED_PAPER

    );

}

//=========================================================
// Clear All Storage
//=========================================================

function clearAllStorage(){

    clearQuestionBank();

    clearBlueprint();

    clearGeneratedPaper();

    localStorage.removeItem(

        STORAGE_KEYS.SETTINGS

    );

    storage.settings={};

    console.log("All Storage Cleared.");

}

//=========================================================
// Storage Information
//=========================================================

function getStorageInfo(){

    return{

        questionBank:storage.questionBank.length,

        chapters:storage.chapters.length,

        blueprint:storage.blueprint.length,

        generatedPaper:storage.generatedPaper.length,

        settings:Object.keys(storage.settings).length

    };

}

//=========================================================
// Print Storage Summary
//=========================================================

function printStorageSummary(){

    console.log("================================");

    console.log("Storage Summary");

    console.table(getStorageInfo());

    console.log("================================");

}
