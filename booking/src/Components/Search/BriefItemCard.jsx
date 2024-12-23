import React, { useEffect, useState, useMemo } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import Image from "../General page/Image";
import ImagesC from "../Main page/ImageCarousel";
import DetailCard from "./DetailCard";

const BriefItemCard = ({ item }) => {
    const [stars, setStars] = useState({});
    const [countReviews, setCountReviews] = useState({});
    const [images, setImages] = useState([]);

    const API_ALL_STARTS_RATING = "http://127.0.0.1:8000/api/v1/get_object_rating/";
    const API_REVIEWS_COUNT = "http://127.0.0.1:8000/api/v1/get_count_of_views/";
    const API_GET_IMAGES = "http://127.0.0.1:8000/api/v1/get_object_images/";

    const HEADERS = {
        'Accept': '*/*',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [starsResponse, reviewsResponse, imagesResponse] = await Promise.all([
                    axios.get(API_ALL_STARTS_RATING + item.id + '/', { headers: HEADERS }),
                    axios.get(API_REVIEWS_COUNT + item.id + '/', { headers: HEADERS }),
                    axios.get(API_GET_IMAGES + `${item.id}`)
                ]);

                setStars(starsResponse.data);
                setCountReviews(reviewsResponse.data);
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
        <div key={item.id}>
            <div className="container">
                <div className="card shadow-lg rounded-lg rounded-end-5" style={{ maxWidth: 1100, height: "auto", margin: 'auto' }}>
                    <div className="row">
                        <div className="col-lg-3 col-12">
                            {images.length ? <ImagesC image_list={images} /> : <Image image="/image/user_objects/nophoto_object.jpg" />}
                        </div>
                        <div className="col-md-9">
                            <Link to={`/search/${item.id}/`} state={item} className="link-dark link-offset-2 link-underline link-underline-opacity-0">
                                <div className="card-body">
                                    <div className="card-text">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-lg-9 text-start border-right">
                                                    <div className="row-2">
                                                        <div className="col">
                                                            <p className="fs-6">{item.general_info ? `${item.general_info.rooms_count}-комнатная квартира` : ""}</p>
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-7 text-black-50">
                                                            <span className="fs-6 mx-0">{item.general_info ? `${item.general_info.room_square}м²` : ""}</span>
                                                            <span className="fs-6 mx-2">{item.general_info ? `гостей: ${item.general_info.guests_count}` : ""}</span>
                                                            <span className="fs-6 mx-2">{item.general_info ? `спальных мест: ${item.general_info.count_sleeping_places}` : ""}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row-sm-4">
                                                        <div className="col">
                                                            <span className="fs-6">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                                </svg>
                                                                {item.address ? `${item.city.name}, ${item.address.street_type} ${item.address.street_name} ${item.address.building_number} ${item.address.corps ? `к${item.address.corps}` : ""}` : ""}
                                                                <br />
                                                                <span className="badge text-bg-success text-wrap">{averageRating}</span>
                                                                &nbsp;<span className="text-secondary">{countReviews.reviews_count} отзыва</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 text-end">
                                                    <p className="fs-6">{item.payment_day} BYN в сутки</p>
                                                    <p className="fs-6">Для будущих доп сведений связанных с оплатой</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/search/:id" element={<DetailCard images={images} />} />
            </Routes>
        </div>
    );
};

export default BriefItemCard;