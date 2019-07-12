import React from 'react';
import { Modal } from 'react-bootstrap';


class ModalApp extends React.Component {

    render() {
        return (<div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {this.props.modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>)
    }
}


export default ModalApp;