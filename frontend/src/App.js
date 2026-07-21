import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadQuestionBank from "./pages/UploadQuestionBank";
import ReviewQuestions from "./pages/ReviewQuestions";
import QuestionBank from "./pages/QuestionBank";
import Blueprint from "./pages/Blueprint";
import GeneratePaper from "./pages/GeneratePaper";
import PreviewPaper from "./pages/PreviewPaper";
import Settings from "./pages/Settings";

import GeneratedPapers from "./pages/GeneratedPapers";
import "./App.css";

function App() {

    return (

        <BrowserRouter>

            <div className="app-container">

                <Navbar />

                <div className="main-container">

                    <Sidebar />

                    <div className="content">

                        <Routes>

                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" />}
                            />

                            <Route
                                path="/login"
                                element={<Login />}
                            />

                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            />

                            <Route
                                path="/upload"
                                element={<UploadQuestionBank />}
                            />

                            <Route
                                path="/review"
                                element={<ReviewQuestions />}
                            />

                            <Route
                                path="/question-bank"
                                element={<QuestionBank />}
                            />

                            <Route
                                path="/blueprint"
                                element={<Blueprint />}
                            />

                            <Route
                                path="/generate"
                                element={<GeneratePaper />}
                            />

                            <Route
                                path="/preview"
                                element={<PreviewPaper />}
                            />

                            <Route
                                path="/settings"
                                element={<Settings />}
                            />
                              <Route
    path="/generated-papers"
    element={<GeneratedPapers />}
/>     

                        </Routes>

                    </div>

                </div>

                <Footer />

            </div>

        </BrowserRouter>

    );

}

export default App;
