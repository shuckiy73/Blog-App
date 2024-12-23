import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalSignIn = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Открыть модальное окно
            </Button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Модальное окно</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Текст модального окна.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSignIn;