import React from "react";
import { Link } from "react-router-dom";

function ForgotPage() {
    return (
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <img src="/image/logo/kvartirnik_logo.png" alt="Логотип" className="w-100" />
                        </div>
                        <div className="card shadow-lg rounded-5">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Забыли пароль?</h1>
                                <form method="POST" className="needs-validation" novalidate="" autocomplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Адрес электронной почты</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            autoFocus
                                        />
                                        <div className="invalid-feedback">
                                            Неверный адрес электронной почты
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            Отправить ссылку
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Вспомнили пароль? <Link to="/login" className="text-dark">Войти</Link>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-muted">
                            Copyright &copy; 2017-2023 &mdash; Ваша компания
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPage;