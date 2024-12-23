import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
    const API_REGISTER = "http://127.0.0.1:8000/api/v1/auth/token/register/";
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);

    // Функция для регистрации
    async function register(event) {
        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(API_REGISTER, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
                    email,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
            });

            if (response.ok) {
                const token = await response.json();
                sessionStorage.setItem("auth_token", JSON.stringify(token));
                console.log("REGISTRATION", token);
                navigate("/"); // Перенаправление на главную страницу
            } else {
                const errors = await response.json();
                console.log("REGISTRATION", errors);
                setError(errors.username[0] || "Ошибка регистрации");
            }
        } catch (error) {
            setError("Произошла ошибка при подключении к серверу");
        }
    }

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await register(event);
        }

        setValidated(true);
    };

    return (
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <img src="/image/logo/kvartirnik_logo.png" alt="Логотип" className="w-100" />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="card shadow-lg rounded-5">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Регистрация</h1>
                                <form
                                    method="POST"
                                    className={`needs-validation ${validated ? "was-validated" : ""}`}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="name">Логин</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            required
                                            autoFocus
                                        />
                                        <div className="invalid-feedback">
                                            Логин обязателен
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Адрес электронной почты</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Неверный адрес электронной почты
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="password">Пароль</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Пароль обязателен
                                        </div>
                                    </div>

                                    <p className="form-text text-muted mb-3">
                                        Регистрируясь, вы соглашаетесь с нашими условиями и политикой конфиденциальности.
                                    </p>

                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            Регистрация
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Уже есть аккаунт? <Link to="/login" className="text-dark">Войти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;