/*=========================================================
AI Question Paper Generator v2.0
Universal Importer
Part 1 : Initialization & File Detection
Developer : Amit Yerpude
=========================================================*/

"use strict";

//=========================================================
// Global Variables
//=========================================================

let uploadedFile = null;

let fileType = "";

let rawText = "";

let questionBank = [];

//=========================================================
// Supported File Types
//=========================================================

const SUPPORTED_FILES = [

    "docx",

    "pdf",

    "txt",

    "csv",

    "json"

];

//=========================================================
// Initialize Importer
//=========================================================

document.addEventListener("DOMContentLoaded", initializeImporter);

function initializeImporter(){

    console.clear();

    console.log("====================================");

    console.log("Universal Importer v2.0 Started");

    console.log("====================================");

    const button = document.getElementById("importButton");

    if(button){

        button.addEventListener(

            "click",

            startImport

        );

    }

    showStatus(

        "Ready to import Question Bank.",

        "success"

    );

}

//=========================================================
// Import Button Click
//=========================================================

function startImport(){

    const input = document.getElementById("questionFile");

    if(!input){

        showStatus(

            "File input not found.",

            "danger"

        );

        return;

    }

    if(input.files.length===0){

        showStatus(

            "Please select a file.",

            "warning"

        );

        return;

    }

    uploadedFile = input.files[0];

    detectFileType(uploadedFile);

}

//=========================================================
// Detect File Type
//=========================================================

function detectFileType(file){

    const extension = file.name

        .split(".")

        .pop()

        .toLowerCase();

    if(!SUPPORTED_FILES.includes(extension)){

        showStatus(

            "Unsupported file format.",

            "danger"

        );

        return;

    }

    fileType = extension;

    console.log("File Name :",file.name);

    console.log("File Type :",fileType);

    console.log("File Size :",file.size,"bytes");

    showStatus(

        "Reading "+fileType.toUpperCase()+" file...",

        "info"

    );

    switch(fileType){

        case "docx":

            readDOCX(file);

            break;

        case "pdf":

            readPDF(file);

            break;

        case "txt":

            readTXT(file);

            break;

        case "csv":

            readCSV(file);

            break;

        case "json":

            readJSON(file);

            break;

        default:

            showStatus(

                "Unknown file type.",

                "danger"

            );

    }

}

//=========================================================
// Placeholder Functions
// These will be implemented in Part 2
//=========================================================

function readDOCX(file){

    console.log("DOCX Reader Coming in Part 2");

}

function readPDF(file){

    console.log("PDF Reader Coming in Part 2");

}

function readTXT(file){

    console.log("TXT Reader Coming in Part 2");

}

function readCSV(file){

    console.log("CSV Reader Coming in Part 2");

}

function readJSON(file){

    console.log("JSON Reader Coming in Part 2");

}

//=========================================================
// Preview
//=========================================================

function showPreview(text){

    const preview = document.getElementById("preview");

    if(!preview)

        return;

    preview.innerHTML =

        "<pre>"+

        text.substring(0,2000)+

        "</pre>";

}
/*=========================================================
AI Question Paper Generator v2.0
Universal Importer
Part 2 : File Readers
=========================================================*/

//=========================================================
// DOCX Reader
//=========================================================

function readDOCX(file){

    const reader = new FileReader();

    reader.onload = function(e){

        mammoth.extractRawText({

            arrayBuffer: e.target.result

        })

        .then(function(result){

            rawText = result.value;

            console.log("========== DOCX ==========");
            console.log(rawText);
            console.log("==========================");

            showPreview(rawText);

            fileLoaded();

        })

        .catch(function(error){

            console.error(error);

            showStatus(

                "Unable to read DOCX file.",

                "danger"

            );

        });

    };

    reader.readAsArrayBuffer(file);

}

//=========================================================
// TXT Reader
//=========================================================

function readTXT(file){

    const reader = new FileReader();

    reader.onload=function(e){

        rawText = e.target.result;

        console.log("========== TXT ==========");

        console.log(rawText);

        console.log("=========================");

        showPreview(rawText);

        fileLoaded();

    };

    reader.readAsText(file);

}

//=========================================================
// JSON Reader
//=========================================================

function readJSON(file){

    const reader = new FileReader();

    reader.onload=function(e){

        try{

            const json=JSON.parse(e.target.result);

            rawText=JSON.stringify(json,null,4);

            console.log(json);

            showPreview(rawText);

            fileLoaded();

        }

        catch(err){

            console.error(err);

            showStatus(

                "Invalid JSON file.",

                "danger"

            );

        }

    };

    reader.readAsText(file);

}

//=========================================================
// CSV Reader
//=========================================================

function readCSV(file){

    const reader = new FileReader();

    reader.onload=function(e){

        rawText=e.target.result;

        console.log(rawText);

        showPreview(rawText);

        fileLoaded();

    };

    reader.readAsText(file);

}

//=========================================================
// PDF Reader
//=========================================================

async function readPDF(file){

    try{

        const buffer=await file.arrayBuffer();

        const pdf=await pdfjsLib.getDocument({

            data:buffer

        }).promise;

        rawText="";

        for(let pageNo=1;pageNo<=pdf.numPages;pageNo++){

            const page=await pdf.getPage(pageNo);

            const content=await page.getTextContent();

            const text=content.items

                .map(item=>item.str)

                .join(" ");

            rawText += text + "\n\n";

        }

        console.log("========== PDF ==========");

        console.log(rawText);

        console.log("=========================");

        showPreview(rawText);

        fileLoaded();

    }

    catch(error){

        console.error(error);

        showStatus(

            "Unable to read PDF.",

            "danger"

        );

    }

}

//=========================================================
// Common Function
//=========================================================

function fileLoaded(){

    showStatus(

        "File loaded successfully.<br>Starting AI Conversion...",

        "success"

    );

    console.log("Characters :",rawText.length);

    console.log("Words :",rawText.split(/\s+/).length);

    console.log("Lines :",rawText.split("\n").length);

    // Parser will be added in Part 3

}
