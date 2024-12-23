import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatepicker = ({ mode = "single" }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    if (mode === "single") {
        return (
            <div>
                <h3>Выберите дату:</h3>
                <DatePicker
                    selected={startDate || new Date()}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    placeholderText="Нажмите, чтобы выбрать дату"
                    className="form-control"
                />
            </div>
        );
    }

    if (mode === "range") {
        return (
            <div>
                <h3>Выберите диапазон дат:</h3>
                <div className="row">
                    <div className="col">
                        <label>Дата начала:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <label>Дата окончания:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default CustomDatepicker;