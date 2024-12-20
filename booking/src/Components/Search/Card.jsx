import React, {Component, useState, useEffect, Link} from "react";
import {Route, Routes, useParams} from "react-router-dom";
import axios from "axios";
import Footer from "../General page/Footer";
import NavigateHeader from "../General page/NavigateHeader";
import Booking from "./Booking";
import Reviews from "./reviews/Reviews";
import TotalStars from "./reviews/TotalStars";
import LoginPage from "../Authorization/LoginPage";
import SendReview from "./reviews/SendReview";
import Images from "../General page/Images"
import ImagesC from "../Main page/ImageCarousel";
import Image from "../General page/Image";


import {Paper, Box, ImageList} from '@mui/material'
const Card = (props) => {

    // получаем параметры
    // console.log('PROPS', props.item);

    const ConvertDatetime = (datetime) => {
        let objectDT = new Date(datetime);
        let day = objectDT.getDate();
        let month = objectDT.getMonth() + 1;
        let year = objectDT.getFullYear();
        let time = `${objectDT.getHours()}:${objectDT.getMinutes()}`;
        return `${day}-${month}-${year}`;
    };

    const API_ALL_STARTS_RATING = "http://127.0.0.1:8000/api/v1/get_object_rating/"
    const API_GET_IMAGES = "http://127.0.0.1:8000/api/v1/get_object_images/"

    const [stars, setStars] = useState({})
    const [datetime, setDateTime] = useState();
    const [images, setImages] = useState([]);

    const HEADERS = {
        'Accept': '*/*',
        // "Authorization": `Bearer ${sessionStorage.getItem("auth_token")}`
    };

    async function getStars() {
        const response = await axios.get(API_ALL_STARTS_RATING + props.item.id + '/', {headers: HEADERS})
            .then((response) => {
                setStars(response.data);
            }).catch((error) => {
                console.log(error);
            });
    };


    useEffect(
        () => {
            async function getImages() {
                await axios.get(API_GET_IMAGES + `${props.item.id}`).then((response) => {
                    console.log("response.data.images", response.data.images);
                    setImages(response.data.images);
                }).catch((error) => {
                    console.log(error);
                });
            };
            getImages();
            getStars();
        }, [props.item.id]
    );

    console.log('______CARD_____', images)
    return (
        <div className="container  ">
            <div className="row">
                <div className="col-lg-8">
                    <div className="item-details-container row-fluid">
                        <h2 className="item-details-heading">{props.item.title}</h2>

                        <p>
                            {(props.reviews.length > 0) ?
                                <span>
                                    <span className="fw-bold img-fluid">
                                                <img
                                                    src="/image/otherIcons/red_star_rating.png"
                                                    width="30"
                                                    height="20"/>
                                        {
                                            stars ?
                                                (
                                                    (
                                                        stars.cleanliness__avg +
                                                        stars.conformity_to_photos__avg +
                                                        stars.price_quality__avg +
                                                        stars.location__avg +
                                                        stars.quality_of_service__avg +
                                                        stars.timeliness_of_check_in__avg
                                                    ) / 6
                                                ).toFixed(1)
                                                : ""
                                        }

                                    </span>
                                    <span>
                                    &nbsp;<span className="text-secondary">
                                            {props.reviews.length} отзыва
                                        </span>
                                    </span>
                                </span>
                                : ""
                            }
                            <span className="text-secondary">
                              &nbsp;{props.item.address ? `${props.item.city.name}, ${props.item.address.street_type} ${props.item.address.street_name} ${props.item.address.building_number} ${props.item.address.corps ? props.item.address.corps : ""}` : ""}
                            </span>
                        </p>
                        <div className="container">
                            {/*<div className="col-lg-3 col-12 ">*/}
                                {
                                    images ? <Box sx={{ maxWidth: 800, flexGrow: 1, margin: 'auto', mt: 5 }}><ImagesC image_list={images} height={600}/></Box> :
                                        <Image image="/image/user_objects/nophoto_object.jpg"/>
                                }
                            {/*</div>*/}
                        </div>
                        <br/>
                        <div className="item-details shadow-lg p-3  rounded-5">
                            <div className="item-details-info">


                                {props.item.building_info && props.item.general_info ?
                                    <h4>{props.item.building_info.building_type_name} {props.item.general_info.room_square}м<sup>2</sup>
                                    </h4> : ""}

                                <div className="container">
                                    {props.item.general_info ?
                                        (<div className="row">
                                            <div className="col">
                                                <h6>Гостей: {props.item.general_info.guests_count}</h6>
                                            </div>
                                            <div className="col">
                                                <h6>Комнат: {props.item.general_info.rooms_count} </h6>
                                            </div>
                                            <div className="col">
                                                <h6>{props.item.general_info.kitchen} </h6>
                                            </div>
                                            <div className="col">
                                                <h6>{props.item.general_info.room_repair} </h6>
                                            </div>
                                            <div className="col">
                                                <h6>этаж {props.item.general_info.floor} из {props.item.general_info.floor_in_the_house}{props.item.address ? `${props.item.address.has_elevator ? ", есть лифт" : "."}` : "."} </h6>

                                            </div>
                                        </div>) : ""}
                                </div>

                                <p>{props.item.building_description}</p>
                                <h6>Спальные
                                    места: {props.item.general_info ? props.item.general_info.count_sleeping_places : ""}</h6>
                            </div>


                        </div>
                        <br/>
                        <div className="item-details shadow-lg p-3 rounded-5">
                            <h4>Правила размещения</h4>
                            <div className="container">
                                <div className="row row-cols-3">
                                    <div className="col fw-bold">Заезд</div>
                                    <div className="col fw-bold">Отъезд</div>
                                    <div className="col fw-bold">Минимальный период проживания</div>
                                    <div className="col">после {props.item.arrival_time}</div>
                                    <div className="col">до {props.item.departure_time}</div>
                                    <div className="col">от {props.item.minimum_length_of_stay} суток</div>
                                </div>

                            </div>
                            <ul className="list-group list-group-flush ">
                                {props.item.placing_rules ? props.item.placing_rules.with_children ?
                                    <li className="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-hearts" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015Zm6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343ZM7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358Z"/>
                                        </svg>
                                        можно с детьми любого возраста</li> : "" : ""}
                                {props.item.placing_rules ? props.item.placing_rules.with_animals ?
                                    <li className="list-group-item">С питомцами</li> :
                                    <li className="list-group-item">Без питомцев</li> : ""}
                                {props.item.placing_rules ? props.item.placing_rules.smoking_is_allowed ?
                                    <li className="list-group-item">Курение разрешено</li> :
                                    <li className="list-group-item">Курение запрещено</li> : ""}
                                {props.item.placing_rules ? props.item.placing_rules.parties_are_allowed ?
                                    <li className="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-hammer" viewBox="0 0 16 16">
                                            <path
                                                d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z"/>
                                        </svg>
                                        вечеринки и мероприятия разрешены</li> : <li
                                        className="list-group-item">без вечеринок и мероприятий</li> : ""}
                                {props.item.placing_rules ? props.item.placing_rules.accounting_documents ?
                                    <li className="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                            <path
                                                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                            <path
                                                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                        </svg>
                                        владелец предоставляет отчетные документы о проживании по согласованию
                                    </li> : "" : ""}
                            </ul>

                        </div>
                        <br/>
                        <div className="item-details shadow-lg p-3  rounded-5">
                            <div className="item-details-info">
                                <span className="fs-3 fw-bold img-fluid">Оценка гостей</span>
                                <span>
                                    {(props.reviews.length > 0) ?
                                        <span>
                                            <span className="fs-5 fw-bold img-fluid">
                                                <img
                                                    src="/image/otherIcons/red_star_rating.png"
                                                    width="40"
                                                    height="30"/>
                                                {
                                                    stars ?
                                                        (
                                                            (
                                                                stars.cleanliness__avg +
                                                                stars.conformity_to_photos__avg +
                                                                stars.price_quality__avg +
                                                                stars.location__avg +
                                                                stars.quality_of_service__avg +
                                                                stars.timeliness_of_check_in__avg
                                                            ) / 6
                                                        ).toFixed(1)
                                                        : ""
                                                }
                                            </span>
                                            <span>
                                                &nbsp;<span className="text-secondary">
                                                    {props.reviews.length} отзыва
                                                </span>
                                            </span>
                                        </span>

                                        :
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col align-text-center"></div>

                                                <div className="col-lg-8 align-text-center">
                                                    Пока что отзывов нету. Будьте
                                                        первым! <br/>
                                                        {sessionStorage.getItem("auth_token") ?
                                                            <SendReview/>
                                                            : <p>
                                                                <a href="/login">Авторизуйтесь</a> для того что бы
                                                                оставить
                                                                отзыв!
                                                            </p>}
                                                </div>
                                                <div className="col align-text-center"></div>
                                            </div>
                                        </div>

                                    }

                                </span>

                                {
                                    (props.reviews.length > 0) ?
                                        <span>
                                                <TotalStars star={stars}/>
                                            <div className="container">
                                                {sessionStorage.getItem("auth_token") ?
                                                    <SendReview/>
                                                    : <div className="col-md">
                                                        <a href="/login">Авторизуйтесь</a> для того что бы оставить
                                                        отзыв!
                                                    </div>}
                                            </div>
                                                <Reviews reviews={props.reviews}/>
                                            </span> : ""
                                }

                            </div>
                        </div>

                        {/*<Link to="/" className="go-back-button">Go Back</Link>*/}
                    </div>
                </div>
                <div className="col-lg-4">
                    <Booking prepayment={props.item.prepayment} payment_day={props.item.payment_day} room_object={props.item.id}/>
                </div>
            </div>
            <Routes>
                <Route
                    path="/login"
                    render={(props) => <LoginPage props/>}
                />
            </Routes>
        </div>

    );
};

export default Card;