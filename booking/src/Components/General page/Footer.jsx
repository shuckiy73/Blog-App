import React from "react";

const Footer = () => {
    return (
        <footer className="navbar-fixed-bottom row-fluid wrapper">
            <div className="navbar-inner">
                <div className="blockcode">
                    <div className="shadow mt-auto rounded-5">
                        <div
                            className="d-flex justify-content-between align-items-center mx-auto py-4 flex-wrap"
                            style={{ width: "80%" }}
                        >
                            <a href="#" className="d-flex align-items-center p-0 text-dark">
                                <img
                                    alt="logo"
                                    src="/image/logo/kvartirnik_logo.png"
                                    width="250"
                                    height="100"
                                />
                                {/* <span className="ms-4 h5 font-weight-bold">Квартирник</span> */}
                            </a>

                            <small>&copy; Квартирник, 2024. Все права защищены.</small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;