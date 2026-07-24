/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 1 : Initialization
=========================================================*/

"use strict";

//=========================================================
// Manager Object
//=========================================================
console.log("MANAGER JS LOADED");
let manager={

    questionBank:[],

    filteredQuestions:[],

    currentPage:1,

    pageSize:20,

    editingIndex:-1

};

//=========================================================
// Initialize Manager
//=========================================================

function initializeManager(){

    console.log("================================");

    console.log("Question Bank Manager");

    console.log("Initializing...");

    console.log("================================");

    loadManagerData();

    populateChapterFilter();

    updateStatistics();

    displayQuestions();

    registerManagerEvents();

}

//=========================================================
// Load Data
//=========================================================

function loadManagerData(){

    manager.questionBank=

        loadQuestionBank();

    manager.filteredQuestions=[

        ...manager.questionBank

    ];

    console.log(

        "Questions Loaded :",

        manager.questionBank.length

    );

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 2 : Statistics & Filters
=========================================================*/

//=========================================================
// Populate Chapter Filter
//=========================================================

function populateChapterFilter(){

    const select=document.getElementById(

        "chapterFilter"

    );

    if(!select)
        return;

    select.innerHTML=`

<option value="">

All Chapters

</option>

`;

    loadChapters().forEach(function(chapter){

        select.innerHTML+=`

<option value="${chapter}">

${chapter}

</option>

`;

    });

}

//=========================================================
// Update Statistics
//=========================================================

function updateStatistics(){

    document.getElementById(

        "totalQuestions"

    ).innerHTML=

        manager.questionBank.length;

    document.getElementById(

        "totalChapters"

    ).innerHTML=

        new Set(

            manager.questionBank.map(

                q=>q.chapter

            )

        ).size;

    document.getElementById(

        "totalSubjects"

    ).innerHTML=

        new Set(

            manager.questionBank.map(

                q=>q.subject

            )

        ).size;

}

//=========================================================
// Refresh Statistics
//=========================================================

function refreshManager(){

    loadManagerData();

    populateChapterFilter();

    updateStatistics();

    displayQuestions();

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 3 : Display Questions
=========================================================*/

//=========================================================
// Display Questions
//=========================================================

function displayQuestions(){

    const tbody=document.getElementById(

        "questionTableBody"

    );

    if(!tbody)
        return;

    tbody.innerHTML="";

    //-------------------------------------------------
    // Pagination
    //-------------------------------------------------

    const start=(manager.currentPage-1)

        * manager.pageSize;

    const end=start+manager.pageSize;

    const pageQuestions=

        manager.filteredQuestions.slice(

            start,

            end

        );

    //-------------------------------------------------
    // No Questions
    //-------------------------------------------------

    if(pageQuestions.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="7"

class="text-center">

No Questions Found

</td>

</tr>

`;

        updatePagination();

        return;

    }

    //-------------------------------------------------
    // Build Table
    //-------------------------------------------------

    pageQuestions.forEach(function(q,index){

        tbody.innerHTML+=`

<tr>

<td>

${start+index+1}

</td>

<td>

${q.chapter}

</td>

<td>

${q.marks}

</td>

<td>

${q.type}

</td>

<td>

${q.question}

</td>

<td>

${q.difficulty}

</td>

<td>

<button

class="btn btn-sm btn-warning"

onclick="editQuestion(${start+index})">

Edit

</button>

<button

class="btn btn-sm btn-danger ms-1"

onclick="deleteQuestion(${start+index})">

Delete

</button>

</td>

</tr>

`;

    });

    updatePagination();

}

//=========================================================
// Pagination
//=========================================================

function updatePagination(){

    document.getElementById(

        "showingCount"

    ).innerHTML=

        manager.filteredQuestions.length;

    const totalPages=Math.max(

        1,

        Math.ceil(

            manager.filteredQuestions.length/

            manager.pageSize

        )

    );

    document.getElementById(

        "pageNumber"

    ).innerHTML=

        "Page "

        + manager.currentPage +

        " of "

        + totalPages;

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 4 : Search & Filters
=========================================================*/

//=========================================================
// Apply Filters
//=========================================================

function applyFilters(){

    const search=document.getElementById(

        "searchBox"

    ).value.toLowerCase().trim();

    const chapter=document.getElementById(

        "chapterFilter"

    ).value;

    const marks=document.getElementById(

        "marksFilter"

    ).value;

    const type=document.getElementById(

        "typeFilter"

    ).value;

    const difficulty=document.getElementById(

        "difficultyFilter"

    ).value;

    manager.filteredQuestions=

        manager.questionBank.filter(function(q){

            //-------------------------------------------------
            // Search
            //-------------------------------------------------

            if(

                search &&

                !q.question.toLowerCase().includes(search) &&

                !q.chapter.toLowerCase().includes(search)

            ){

                return false;

            }

            //-------------------------------------------------
            // Chapter
            //-------------------------------------------------

            if(

                chapter &&

                q.chapter!==chapter

            ){

                return false;

            }

            //-------------------------------------------------
            // Marks
            //-------------------------------------------------

            if(

                marks &&

                Number(q.marks)!==Number(marks)

            ){

                return false;

            }

            //-------------------------------------------------
            // Type
            //-------------------------------------------------

            if(

                type &&

                q.type!==type

            ){

                return false;

            }

            //-------------------------------------------------
            // Difficulty
            //-------------------------------------------------

            if(

                difficulty &&

                q.difficulty!==difficulty

            ){

                return false;

            }

            return true;

        });

    manager.currentPage=1;

    displayQuestions();

}

//=========================================================
// Clear Filters
//=========================================================

function clearFilters(){

    document.getElementById(

        "searchBox"

    ).value="";

    document.getElementById(

        "chapterFilter"

    ).value="";

    document.getElementById(

        "marksFilter"

    ).value="";

    document.getElementById(

        "typeFilter"

    ).value="";

    document.getElementById(

        "difficultyFilter"

    ).value="";

    manager.filteredQuestions=[

        ...manager.questionBank

    ];

    manager.currentPage=1;

    displayQuestions();

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 5 : Add & Edit Questions
=========================================================*/

//=========================================================
// Add New Question
//=========================================================

function addQuestion(){

    manager.editingIndex=-1;

    document.getElementById("modalTitle").innerHTML="Add Question";

    document.getElementById("subjectInput").value="";

    document.getElementById("chapterInput").value="";

    document.getElementById("marksInput").value="1";

    document.getElementById("typeInput").value="Theory";

    document.getElementById("difficultyInput").value="Medium";

    document.getElementById("questionInput").value="";

    document.getElementById("answerInput").value="";

    new bootstrap.Modal(

        document.getElementById("questionModal")

    ).show();

}

//=========================================================
// Edit Question
//=========================================================

function editQuestion(index){

    manager.editingIndex=index;

    const q=manager.filteredQuestions[index];

    document.getElementById("modalTitle").innerHTML="Edit Question";

    document.getElementById("subjectInput").value=q.subject;

    document.getElementById("chapterInput").value=q.chapter;

    document.getElementById("marksInput").value=q.marks;

    document.getElementById("typeInput").value=q.type;

    document.getElementById("difficultyInput").value=q.difficulty;

    document.getElementById("questionInput").value=q.question;

    document.getElementById("answerInput").value=q.answer || "";

    new bootstrap.Modal(

        document.getElementById("questionModal")

    ).show();

}

//=========================================================
// Save Question
//=========================================================

function saveQuestion(){

    const question={

        id:

            manager.editingIndex==-1

            ? "Q"+Date.now()

            : manager.filteredQuestions[manager.editingIndex].id,

        subject:

            document.getElementById("subjectInput").value,

        chapter:

            document.getElementById("chapterInput").value,

        section:"A",

        marks:Number(

            document.getElementById("marksInput").value

        ),

        type:

            document.getElementById("typeInput").value,

        difficulty:

            document.getElementById("difficultyInput").value,

        question:

            document.getElementById("questionInput").value,

        answer:

            document.getElementById("answerInput").value

    };

    if(manager.editingIndex==-1){

        manager.questionBank.push(question);

    }else{

        const oldQuestion=

            manager.filteredQuestions[manager.editingIndex];

        const actualIndex=

            manager.questionBank.indexOf(oldQuestion);

        manager.questionBank[actualIndex]=question;

    }

    saveQuestionBank(manager.questionBank);

    saveChapters(

        [...new Set(

            manager.questionBank.map(q=>q.chapter)

        )]

    );

    refreshManager();

    bootstrap.Modal

        .getInstance(

            document.getElementById("questionModal")

        )

        .hide();

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 6 : Delete Questions
=========================================================*/

//=========================================================
// Delete One Question
//=========================================================

function deleteQuestion(index){

    if(!confirm("Delete this question?"))
        return;

    const question=

        manager.filteredQuestions[index];

    const actualIndex=

        manager.questionBank.indexOf(question);

    if(actualIndex!==-1){

        manager.questionBank.splice(

            actualIndex,

            1

        );

    }

    saveQuestionBank(manager.questionBank);

    saveChapters(

        [...new Set(

            manager.questionBank.map(

                q=>q.chapter

            )

        )]

    );

    refreshManager();

}

//=========================================================
// Delete All Questions
//=========================================================

function deleteAllQuestions(){

    if(

        !confirm(

            "Delete ALL questions from Question Bank?"

        )

    ){

        return;

    }

    manager.questionBank=[];

    manager.filteredQuestions=[];

    saveQuestionBank([]);

    saveChapters([]);

    refreshManager();

}

//=========================================================
// Refresh Button
//=========================================================

function refreshQuestionBank(){

    refreshManager();

}

//=========================================================
// Export Question Bank
//=========================================================

function exportQuestionBank(){

    const data=JSON.stringify(

        manager.questionBank,

        null,

        4

    );

    const blob=new Blob(

        [data],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="QuestionBank.json";

    a.click();

    URL.revokeObjectURL(url);

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 7 : Pagination & Events
=========================================================*/

//=========================================================
// Previous Page
//=========================================================

function previousPage(){

    if(manager.currentPage>1){

        manager.currentPage--;

        displayQuestions();

    }

}

//=========================================================
// Next Page
//=========================================================

function nextPage(){

    const totalPages=Math.ceil(

        manager.filteredQuestions.length/

        manager.pageSize

    );

    if(manager.currentPage<totalPages){

        manager.currentPage++;

        displayQuestions();

    }

}

//=========================================================
// Register Events
//=========================================================

function registerManagerEvents(){

    //-------------------------------------------------
    // Search
    //-------------------------------------------------

    document.getElementById(

        "searchBox"

    ).addEventListener(

        "input",

        applyFilters

    );

    //-------------------------------------------------
    // Filters
    //-------------------------------------------------

    document.getElementById(

        "chapterFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "marksFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "typeFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    document.getElementById(

        "difficultyFilter"

    ).addEventListener(

        "change",

        applyFilters

    );

    //-------------------------------------------------
    // Buttons
    //-------------------------------------------------

    document.getElementById(

        "addQuestionBtn"

    ).addEventListener(

        "click",

        addQuestion

    );

    document.getElementById(

        "saveQuestionBtn"

    ).addEventListener(

        "click",

        saveQuestion

    );

    document.getElementById(

        "refreshBtn"

    ).addEventListener(

        "click",

        refreshQuestionBank

    );

    document.getElementById(

        "exportBtn"

    ).addEventListener(

        "click",

        exportQuestionBank

    );

    document.getElementById(

        "deleteAllBtn"

    ).addEventListener(

        "click",

        deleteAllQuestions

    );

    //-------------------------------------------------
    // Pagination
    //-------------------------------------------------

    document.getElementById(

        "previousPage"

    ).addEventListener(

        "click",

        previousPage

    );

    document.getElementById(

        "nextPage"

    ).addEventListener(

        "click",

        nextPage

    );

}
/*=========================================================
AI Question Paper Generator v2.0
Question Bank Manager
Part 8 : Finalization
=========================================================*/

//=========================================================
// Manager Information
//=========================================================

function getManagerInfo(){

    return{

        totalQuestions: manager.questionBank.length,

        filteredQuestions: manager.filteredQuestions.length,

        currentPage: manager.currentPage,

        pageSize: manager.pageSize,

        totalPages: Math.max(

            1,

            Math.ceil(

                manager.filteredQuestions.length/

                manager.pageSize

            )

        )

    };

}

//=========================================================
// Print Manager Summary
//=========================================================

function printManagerSummary(){

    console.log("================================");

    console.log("Question Bank Manager Summary");

    console.table(getManagerInfo());

    console.log("================================");

}

//=========================================================
// Reload Manager
//=========================================================

function reloadManager(){

    initializeStorage();

    refreshManager();

    printManagerSummary();

}

//=========================================================
// Safety Check
//=========================================================

function managerReady(){

    return(

        typeof loadQuestionBank==="function" &&

        typeof saveQuestionBank==="function" &&

        typeof saveChapters==="function"

    );

}

//=========================================================
// Startup Message
//=========================================================

if(managerReady()){

    console.log("Manager Module Loaded Successfully.");

}else{

    console.warn(

        "Manager Module Waiting for Storage..."

    );

}
document.addEventListener("DOMContentLoaded", function(){

    initializeManager();

});
//=========================================================
// Workflow : Enable Blueprint
//=========================================================

function checkBlueprintAccess(){

    let questions = loadQuestionBank();


    if(questions.length > 0){

        let btn=document.getElementById(
            "blueprintButton"
        );


        if(btn){

            btn.classList.remove("d-none");

        }

    }

}


document.addEventListener(
"DOMContentLoaded",
function(){

    setTimeout(
        checkBlueprintAccess,
        500
    );

});
