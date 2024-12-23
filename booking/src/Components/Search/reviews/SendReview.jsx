import React from 'react';
import { Button, Grid, TextField } from '@mui/material';

const SendReview = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Добавьте логику обработки формы здесь
    };

    return (
        <div className="container">
            <form method="POST" className="needs-validation" autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3 align-content-center">
                    <div className="row">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="cleanliness"
                                    label="Чистота"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                                <br />
                                <br />
                                <TextField
                                    id="timeliness_of_check_in"
                                    label="Своевременность заселения"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                                <br />
                                <br />
                                <TextField
                                    id="location"
                                    label="Расположение"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="conformity_to_photos"
                                    label="Соответствие фото"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                                <br />
                                <br />
                                <TextField
                                    id="price_quality"
                                    label="Цена - качество"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                                <br />
                                <br />
                                <TextField
                                    id="quality_of_service"
                                    label="Качество обслуживания"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                        max: 10,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="row">
                        <div className="input-group mb-3">
                            <textarea
                                id="comment"
                                className="form-control"
                                rows="5"
                                placeholder="Ваш комментарий..."
                            />
                            <Button type="submit" variant="outlined" color="success">
                                Опубликовать
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <br />
        </div>
    );
};

export default SendReview;