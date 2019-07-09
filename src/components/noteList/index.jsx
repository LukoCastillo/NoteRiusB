import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNote } from '../../redux/actions/note-actions';


function NoteItem({ note, onClick }) {
    return (<ListGroup.Item>
        <Row>
            <Col xs={10}>
                <Link to={"/createNote/" + note.id} className="nav-link">{note.title}</Link>
            </Col>
            <Col xs={2}>
                <Button variant="danger" size="sm" onClick={onClick}>Delete</Button>
            </Col>
        </Row>
    </ListGroup.Item>);
}

const NoteList = ({ notes, filter, onDeleteNote }) => {
    let notesFilter = filter.text === "" ? notes : notes.filter((n) => n.title.includes(filter.text));
    return (<ListGroup variant="flush">
        {notesFilter.map((note) => (
            <NoteItem key={note.id} note={note} onClick={() => onDeleteNote(note.id)} />
        ))}
    </ListGroup>)
};


const mapStateToProps = (state, props) => {
    return {
        notes: state.notes,
        filter: state.filter
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onDeleteNote: deleteNote
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(NoteList);