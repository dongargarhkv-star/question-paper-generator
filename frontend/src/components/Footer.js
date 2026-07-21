import React from "react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer mt-auto py-3">

            <div className="container-fluid">

                <div className="row align-items-center">

                    {/* Left */}

                    <div className="col-md-4 text-start">

                        <h6 className="mb-1 fw-bold">
                            AI Question Paper Generator
                        </h6>

                        <small>
                            Intelligent Question Paper Creation System
                        </small>

                    </div>

                    {/* Center */}

                    <div className="col-md-4 text-center">

                        <small>

                            <strong>Developed By</strong>

                            <br />

                            <strong>Amit Yerpude</strong>

                            <br />

                            PGT (Computer Science)

                            <br />

                            PM SHRI Kendriya Vidyalaya Dongargarh

                        </small>

                    </div>

                    {/* Right */}

                    <div className="col-md-4 text-end">

                        <small>

                            Version 1.0

                            <br />

                            © {currentYear}

                            <br />

                            All Rights Reserved

                        </small>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;
