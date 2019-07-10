import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNote } from '../../redux/actions/note-actions';
import { filterNote } from '../../redux/actions/filter-actions';

function NoteItem({ note, onClick }) {
    return (<ListGroup.Item>
        <Row>
            <Col xs={9}>
                <Link to={"/createNote/" + note.id} className="nav-link">{note.title}</Link>
            </Col>
            <Col xs={3}>
                <Button variant="danger" size="sm" onClick={onClick}>Delete</Button>
            </Col>
        </Row>
    </ListGroup.Item>);
}


class NoteList extends React.Component {
    componentDidMount() {
        this.props.onClearFilter({ text: "" });
    }
    render() {
        let notesFilter = this.props.filter.text === "" ? this.props.notes : this.props.notes.filter((n) => n.title.includes(this.props.filter.text));
        return (<ListGroup variant="flush">
            {notesFilter.map((note) => (
                <NoteItem key={note.id} note={note} onClick={() => this.props.onDeleteNote(note.id)} />
            ))}
        </ListGroup>)
    }
}


const mapStateToProps = (state, props) => {
    return {
        notes: state.notes,
        filter: state.filter
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onDeleteNote: deleteNote,
        onClearFilter: filterNote
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(NoteList);