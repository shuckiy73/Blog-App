import React, { useState } from "react";
import axios from "axios";
import BriefItemCard from "./BriefItemCard";
import NavigateHeader from "../General page/NavigateHeader";
import Footer from "../General page/Footer";

const Search = () => {
    const API_URL_SEARCH = "http://127.0.0.1:8000/api/v1/search/?search=";
    const [isStartSearch, setStartSearch] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [inputData, setInputData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const RunSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const data_input_location = document.getElementById("input_search_location").value;
            const data_input_datetime_check_in = document.getElementById("input_search_datetime_check-in").value;
            const data_input_datetime_departure = document.getElementById("input_search_datetime_departure").value;

            setInputData(data_input_location);

            const headers = {
                'Accept': '*/*',
            };

            const response = await axios.get(
                `${API_URL_SEARCH}${data_input_location}&arrive=${data_input_datetime_check_in}&departure=${data_input_datetime_departure}`,
                { headers }
            );

            setSearchData(response.data.results);
            setStartSearch(true);
        } catch (err) {
            console.error("Ошибка при выполнении поиска:", err);
            setError("Произошла ошибка при выполнении поиска. Пожалуйста, попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <NavigateHeader />
            <div className="container flex-auto">
                <div className="card bg-light text-white rounded-5">
                    <img
                        src="/image/background/search_background.jpg"
                        className="card-img img-fluid rounded-5"
                        alt="..."
                        style={{ maxWidth: 1250 }}
                    />
                    <div className="card-img-overlay">
                        <div id="Search_bar" className="flex-auto">
                            <br />
                            <p className="display-2 fs-0 fw-bold text-center">Найдём, где остановиться!</p>
                            <br />
                            <br />
                            <p className="lead text-center fs-3">
                                Квартиры, отели, гостевые дома — 280 тысяч вариантов для поездок по России и зарубежью
                            </p>
                            <br />
                            <div className="input-group mb-5 flex-auto" style={{ width: 950, margin: "auto" }}>
                                <input
                                    type="text"
                                    className="form-control form-control-lg input-font-size-lg"
                                    placeholder="Курорт, город или адрес"
                                    aria-label="Курорт, город или адрес"
                                    aria-describedby="button-addon2"
                                    id="input_search_location"
                                />
                                <input
                                    type="date"
                                    className="form-control form-control-lg input-font-size-lg"
                                    aria-label="Дата заселения"
                                    aria-describedby="button-addon2"
                                    id="input_search_datetime_check-in"
                                />
                                <input
                                    type="date"
                                    className="form-control form-control-lg input-font-size-lg"
                                    aria-label="Дата отъезда"
                                    aria-describedby="button-addon2"
                                    id="input_search_datetime_departure"
                                />
                                <button className="btn btn-danger" type="button" id="button-addon2" onClick={RunSearch}>
                                    Найти...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                {loading && <p>Загрузка...</p>}
                {error && <p className="text-danger">{error}</p>}
                {!loading && !error && (
                    <span className="h4">
                        {searchData.length > 0 ? (
                            <>
                                Найдено совпадений: {searchData.length} <br />
                                По запросу: "{inputData}" <br />
                                {searchData.map((item) => (
                                    <p key={item.id}>
                                        <BriefItemCard item={item} />
                                    </p>
                                ))}
                            </>
                        ) : isStartSearch ? (
                            `По указанным параметрам поиска: "${inputData}" - данных не найдено!`
                        ) : (
                            ""
                        )}
                    </span>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Search;