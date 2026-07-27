/*=========================================================
AI Question Paper Generator v2.0
Word Export Module
=========================================================*/

"use strict";

//=========================================================
// Download Word Document
//=========================================================

async function downloadWordDocument(){

    if(!generateData.paper || generateData.paper.length===0){

        alert("Generate the Question Paper first.");

        return;

    }

    const settings = generateData.blueprint.paperSettings;

    const {

        Document,

        Packer,

        Paragraph,

        HeadingLevel,

        TextRun,

        AlignmentType

    } = docx;

    let children = [];

    //-----------------------------------------------------
    // School Name
    //-----------------------------------------------------

    children.push(

        new Paragraph({

            text: settings.schoolName,

            heading: HeadingLevel.HEADING_1,

            alignment: AlignmentType.CENTER

        })

    );

    //-----------------------------------------------------
    // Exam Name
    //-----------------------------------------------------

    children.push(

        new Paragraph({

            text: settings.examName,

            heading: HeadingLevel.HEADING_2,

            alignment: AlignmentType.CENTER

        })

    );

    //-----------------------------------------------------
    // Title
    //-----------------------------------------------------

    children.push(

        new Paragraph({

            text: "QUESTION PAPER",

            heading: HeadingLevel.HEADING_2,

            alignment: AlignmentType.CENTER

        })

    );

    //-----------------------------------------------------
    // Paper Details
    //-----------------------------------------------------

    children.push(

        new Paragraph({

            children:[

                new TextRun({

                    text:"Class : "+settings.className,

                    bold:true

                }),

                new TextRun({

                    text:"        Subject : "+settings.subject

                })

            ]

        })

    );

    children.push(

        new Paragraph({

            children:[

                new TextRun({

                    text:"Time : "+settings.duration,

                    bold:true

                }),

                new TextRun({

                    text:"        Maximum Marks : "+settings.maximumMarks

                })

            ]

        })

    );

    //-----------------------------------------------------
    // Instructions
    //-----------------------------------------------------

    children.push(

        new Paragraph({

            text:"GENERAL INSTRUCTIONS",

            heading:HeadingLevel.HEADING_3

        })

    );

    settings.instructions

    .split("\n")

    .forEach(function(line){

        if(line.trim()!==""){

            children.push(

                new Paragraph({

                    text:line,

                    bullet:{

                        level:0

                    }

                })

            );

        }

    });

    //-----------------------------------------------------
    // Questions
    //-----------------------------------------------------

    let currentSection = "";

    let questionNumber = 1;

    generateData.paper.forEach(function(q){

        if(currentSection!==q.section){

            currentSection=q.section;

            children.push(

                new Paragraph({

                    text:"SECTION "+currentSection,

                    heading:HeadingLevel.HEADING_2,

                    alignment:AlignmentType.CENTER

                })

            );

        }

        children.push(

            new Paragraph({

                children:[

                    new TextRun({

                        text:

                        "Q."+questionNumber+

                        "  "+

                        q.question+

                        "   ("+

                        q.marks+

                        " Marks)",

                        size:24

                    })

                ]

            })

        );

        questionNumber++;

    });

    //-----------------------------------------------------
    // Create Document
    //-----------------------------------------------------

    const doc = new Document({

        sections:[

            {

                children:children

            }

        ]

    });

    //-----------------------------------------------------
    // Download
    //-----------------------------------------------------

    const blob = await Packer.toBlob(doc);

    saveAs(

        blob,

        settings.examName+".docx"

    );

}
