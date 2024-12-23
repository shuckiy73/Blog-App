import React from "react";
import TotalStars from "./TotalStars";

const App = () => {
    const starData = {
        cleanliness__avg: 4.5,
        timeliness_of_check_in__avg: 4.2,
        location__avg: 4.8,
        conformity_to_photos__avg: 4.0,
        price_quality__avg: 4.3,
        quality_of_service__avg: 4.7,
    };

    return (
        <div>
            <h1>Пример использования компонента TotalStars</h1>
            <TotalStars star={starData} />
        </div>
    );
};

export default App;