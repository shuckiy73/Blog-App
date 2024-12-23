import React, { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Booking from "./Booking";
import Reviews from "./reviews/Reviews";
import TotalStars from "./reviews/TotalStars";
import LoginPage from "../Authorization/LoginPage";
import SendReview from "./reviews/SendReview";
import Images from "../General page/Images";
import ImagesC from "../Main page/ImageCarousel";
import Image from "../General page/Image";
import { Box } from '@mui/material';

const Card = ({ item, reviews }) => {
    const [stars, setStars] = useState({});
    const [images, setImages] = useState([]);

    const API_ALL_STARTS_RATING = "http://127.0.0.1:8000/api/v1/get_object_rating/";
    const API_GET_IMAGES = "http://127.0.0.1:8000/api/v1/get_object_images/";

    const HEADERS = {
        'Accept': '*/*',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [starsResponse, imagesResponse] = await Promise.all([
                    axios.get(API_ALL_STARTS_RATING + item.id + '/', { headers: HEADERS }),
                    axios.get(API_GET_IMAGES + `${item.id}`)
                ]);

                setStars(starsResponse.data);
                setImages(imagesResponse.data.images);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [item.id]);

    const averageRating = useMemo(() => {
        if (stars) {
            const total = (
                stars.cleanliness__avg +
                stars.conformity_to_photos__avg +
                stars.price_quality__avg +
                stars.location__avg +
                stars.quality_of_service__avg +
                stars.timeliness_of_check_in__avg
            );
            return (total / 6).toFixed(1);
        }
        return "No stars";
    }, [stars]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="item-details-container row-fluid">
                        <h2 className="item-details-heading">{item.title}</h2>
                        <p>
                            {reviews.length > 0 ? (
                                <span>
                                    <span className="fw-bold img-fluid">
                                        <img src="/image/otherIcons/red_star_rating.png" width="30" height="20" />
                                        {averageRating}
                                    </span>
                                    <span>&nbsp;<span className="text-secondary">{reviews.length} отзыва</span></span>
                                </span>
                            ) : ""}
                            <span className="text-secondary">
                                &nbsp;{item.address ? `${item.city.name}, ${item.address.street_type} ${item.address.street_name} ${item.address.building_number} ${item.address.corps ? `к${item.address.corps}` : ""}` : ""}
                            </span>
                        </p>
                        <div className="container">
                            {images.length ? (
                                <Box sx={{ maxWidth: 800, flexGrow: 1, margin: 'auto', mt: 5 }}>
                                    <ImagesC image_list={images} height={600} />
                                </Box>
                            ) : (
                                <Image image="/image/user_objects/nophoto_object.jpg" />
                            )}
                        </div>
                        <br />
                        <div className="item-details shadow-lg p-3 rounded-5">
                            <div className="item-details-info">
                                {item.building_info && item.general_info ? (
                                    <h4>{item.building_info.building_type_name} {item.general_info.room_square}м<sup>2</sup></h4>
                                ) : ""}
                                <div className="container">
                                    {item.general_info ? (
                                        <div className="row">
                                            <div className="col">
                                                <h6>Гостей: {item.general_info.guests_count}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>Комнат: {item.general_info.rooms_count}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>{item.general_info.kitchen}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>{item.general_info.room_repair}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>этаж {item.general_info.floor} из {item.general_info.floor_in_the_house}{item.address ? `${item.address.has_elevator ? ", есть лифт" : "."}` : "."}</h6>
                                            </div>
                                        </div>
                                    ) : ""}
                                </div>
                                <p>{item.building_description}</p>
                                <h6>Спальные места: {item.general_info ? item.general_info.count_sleeping_places : ""}</h6>
                            </div>
                        </div>
                        <br />
                        <div className="item-details shadow-lg p-3 rounded-5">
                            <h4>Правила размещения</h4>
                            <div className="container">
                                <div className="row row-cols-3">
                                    <div className="col fw-bold">Заезд</div>
                                    <div className="col fw-bold">Отъезд</div>
                                    <div className="col fw-bold">Минимальный период проживания</div>
                                    <div className="col">после {item.arrival_time}</div>
                                    <div className="col">до {item.departure_time}</div>
                                    <div className="col">от {item.minimum_length_of_stay} суток</div>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                {item.placing_rules ? (
                                    <>
                                        {item.placing_rules.with_children && (
                                            <li className="list-group-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hearts" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015Zm6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343ZM7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358Z" />
                                                </svg>
                                                можно с детьми любого возраста
                                            </li>
                                        )}
                                        {item.placing_rules.with_animals ? (
                                            <li className="list-group-item">С питомцами</li>
                                        ) : (
                                            <li className="list-group-item">Без питомцев</li>
                                        )}
                                        {item.placing_rules.smoking_is_allowed ? (
                                            <li className="list-group-item">Курение разрешено</li>
                                        ) : (
                                            <li className="list-group-item">Курение запрещено</li>
                                        )}
                                        {item.placing_rules.parties_are_allowed ? (
                                            <li className="list-group-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hammer" viewBox="0 0 16 16">
                                                    <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
                                                </svg>
                                                вечеринки и мероприятия разрешены
                                            </li>
                                        ) : (
                                            <li className="list-group-item">без вечеринок и мероприятий</li>
                                        )}
                                        {item.placing_rules.accounting_documents && (
                                            <li className="list-group-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                </svg>
                                                владелец предоставляет отчетные документы о проживании по согласованию
                                            </li>
                                        )}
                                    </>
                                ) : ""}
                            </ul>
                        </div>
                        <br />
                        <div className="item-details shadow-lg p-3 rounded-5">
                            <div className="item-details-info">
                                <span className="fs-3 fw-bold img-fluid">Оценка гостей</span>
                                <span>
                                    {reviews.length > 0 ? (
                                        <span>
                                            <span className="fs-5 fw-bold img-fluid">
                                                <img src="/image/otherIcons/red_star_rating.png" width="40" height="30" />
                                                {averageRating}
                                            </span>
                                            <span>&nbsp;<span className="text-secondary">{reviews.length} отзыва</span></span>
                                        </span>
                                    ) : (
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col align-text-center"></div>
                                                <div className="col-lg-8 align-text-center">
                                                    Пока что отзывов нету. Будьте первым! <br />
                                                    {sessionStorage.getItem("auth_token") ? (
                                                        <SendReview />
                                                    ) : (
                                                        <p>
                                                            <a href="/login">Авторизуйтесь</a> для того что бы оставить отзыв!
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col align-text-center"></div>
                                            </div>
                                        </div>
                                    )}
                                </span>
                                {reviews.length > 0 ? (
                                    <span>
                                        <TotalStars star={stars} />
                                        <div className="container">
                                            {sessionStorage.getItem("auth_token") ? (
                                                <SendReview />
                                            ) : (
                                                <div className="col-md">
                                                    <a href="/login">Авторизуйтесь</a> для того что бы оставить отзыв!
                                                </div>
                                            )}
                                        </div>
                                        <Reviews reviews={reviews} />
                                    </span>
                                ) : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <Booking prepayment={item.prepayment} payment_day={item.payment_day} room_object={item.id} />
                </div>
            </div>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default Card;