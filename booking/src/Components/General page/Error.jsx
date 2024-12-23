import React from 'react';
import Alert from '@mui/material/Alert';

const Error = ({ error, success }) => {
    return (
        <div>
            {/* Отображение ошибки */}
            {error && (
                <Alert severity="error">
                    {error.error || error.detail || "Произошла ошибка"}
                </Alert>
            )}

            {/* Отображение успешного сообщения */}
            {success && (
                <Alert severity="success">
                    {success.success || "Операция выполнена успешно"}
                </Alert>
            )}
        </div>
    );
};

export default Error;