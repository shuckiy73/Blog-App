import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateHeader from "../General page/NavigateHeader";
import { jwtDecode } from "jwt-decode"; // Исправленный импорт

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_USERDATA = "http://127.0.0.1:8000/api/v1/user/data/"; // Укажите правильный URL
    const [tokens, setTokens] = useState({});
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    // Функция для декодирования JWT
    const decodeToken = useCallback((token) => {
        try {
            return jwtDecode(token); // Используем jwtDecode
        } catch (error) {
            return null;
        }
    }, []);

    // Проверка наличия токена при загрузке страницы
    useEffect(() => {
        const authToken = sessionStorage.getItem("auth_token");
        if (authToken) {
            const parsedToken = JSON.parse(authToken);
            setTokens(parsedToken);

            const decoded = decodeToken(parsedToken.refresh);
            if (decoded) {
                setUsername(decoded.username);
            }
        } else {
            navigate("/login"); // Перенаправление на страницу входа, если токена нет
        }
    }, [navigate, decodeToken]);

    // Получение данных пользователя
    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(API_USERDATA, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": `Bearer ${tokens.access}`,
                },
                body: JSON.stringify({
                    refresh_token: tokens.refresh,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                setError("Ошибка при получении данных пользователя");
            }
        } catch (error) {
            setError("Произошла ошибка при подключении к серверу");
        }
    }, [tokens]);

    useEffect(() => {
        if (tokens.access) {
            fetchUserData();
        }
    }, [tokens, fetchUserData]);

    return (
        <div>
            <NavigateHeader />
            <div>
                <h1>Профиль пользователя</h1>
                <p>ID: {id}</p>
                <p>Имя пользователя: {username}</p>
                {userData && (
                    <div>
                        <h2>Данные пользователя:</h2>
                        <pre>{JSON.stringify(userData, null, 2)}</pre>
                    </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default ProfilePage;