import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Card from "./Card";
import NotFound from "../General page/NotFound";

const DetailCard = ({ images }) => {
    const { id } = useParams(); // Получаем параметр id из URL
    const [objectRoom, setObjectRoom] = useState(null); // Состояние для объекта
    const [reviews, setReviews] = useState([]); // Состояние для отзывов
    const [loading, setLoading] = useState(true); // Состояние для индикации загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    const API_URL_ID = "http://127.0.0.1:8000/api/v1/search/";
    const API_REVIEWS = "http://127.0.0.1:8000/api/v1/object_reviews/";

    const HEADERS = {
        'Accept': '*/*',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Запрос данных об объекте
                const [objectResponse, reviewsResponse] = await Promise.all([
                    axios.get(`${API_URL_ID}${id}/`, { headers: HEADERS }),
                    axios.get(`${API_REVIEWS}${id}/`, { headers: HEADERS }),
                ]);

                setObjectRoom(objectResponse.data); // Устанавливаем данные об объекте
                setReviews(reviewsResponse.data); // Устанавливаем отзывы
                setLoading(false); // Завершаем загрузку
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                setError(error); // Устанавливаем ошибку
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки
    }

    if (error) {
        return <NotFound />; // Показываем страницу 404 в случае ошибки
    }

    return (
        <div>
            <NavigateHeader />
            <Card item={objectRoom} reviews={reviews} images={images} />
            <Footer />
        </div>
    );
};

export default DetailCard;