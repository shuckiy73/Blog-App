import React from "react";

const Popular = () => {
    return (
        <div className="container-xl shadow rounded-5">
            <h1 className="text-center">Популярно за рубежом</h1>
            <br />
            <div className="row row-cols-xl-4">
                <CountryCard
                    image="/image/countries/Belarus.svg"
                    country="Беларусь"
                    cities="Минск, Брест, Витебск"
                />
                <CountryCard
                    image="/image/countries/Kazakhstan.svg"
                    country="Казахстан"
                    cities="Астана, Алматы, Актау"
                />
                <CountryCard
                    image="/image/countries/Abkhazia.svg"
                    country="Абхазия"
                    cities="Гагра, Сухум, Пицундра"
                />
                <CountryCard
                    image="/image/countries/Georgia.svg"
                    country="Грузия"
                    cities="Тбилиси, Батуми"
                />
            </div>
            <br />
            <div className="row row-cols-xl-4">
                <CountryCard
                    image="/image/countries/Armenia.svg"
                    country="Армения"
                    cities="Ереван, Дилижан"
                />
                <CountryCard
                    image="/image/countries/Turkey.svg"
                    country="Турция"
                    cities="Анталия, Стамбул, Аланья"
                />
                <CountryCard
                    image="/image/countries/Azerbaijan.svg"
                    country="Азербайджан"
                    cities="Баку, Сиазань"
                />
                <CountryCard
                    image="/image/countries/Kyrgyzstan.svg"
                    country="Киргизия"
                    cities="Бишкек, Каракол"
                />
            </div>
            <br />
            <div className="row row-cols-xl-4">
                <CountryCard
                    image="/image/countries/Egypt.svg"
                    country="Египет"
                    cities="Шарм-эль-Шейх, Хургада"
                />
                <CountryCard
                    image="/image/countries/Thailand.svg"
                    country="Тайланд"
                    cities="Пхукет, Паттайя"
                />
                <CountryCard
                    image="/image/countries/Uzbekistan.svg"
                    country="Узбекистан"
                    cities="Ташкент, Самарканд"
                />
                <CountryCard
                    image="/image/countries/UAE.svg"
                    country="ОАЭ"
                    cities="Дубай, Умм-эль-Кайвайн"
                />
            </div>
            <br />
        </div>
    );
};

const CountryCard = ({ image, country, cities }) => {
    return (
        <div className="col col-md-4">
            <div className="row">
                <div className="col-md-2">
                    <img src={image} alt={country} />
                </div>
                <div className="col-md-8">
                    <span className="h6">{country}</span>
                    <br />
                    <span className="text-secondary">{cities}</span>
                </div>
            </div>
        </div>
    );
};

export default Popular;