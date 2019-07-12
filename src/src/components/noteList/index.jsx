import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNote } from '../../redux/actions/note-actions';
import { filterNote } from '../../redux/actions/filter-actions';

import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

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
    constructor(props) {
        super(props);
        this.state = { showModal: false, noteId: "" };
    }
    componentDidMount() {
        this.props.onClearFilter({ text: "" });
    }
    onStartDeleteNote = (idx) => {
        this.setState({ showModal: true, noteId: idx });
    }

    confirmDeleteNote = () => {
        let _noteId = this.state.noteId;
        this.setState({ showModal: false, noteId: "" });
        this.props.onDeleteNote(_noteId);
    }

    cancelDeleteNote = () => {
        this.setState({ showModal: false, noteId: "" });
    }

    render() {
        let notesFilter = this.props.filter.text === "" ? this.props.notes : this.props.notes.filter((n) => n.title.includes(this.props.filter.text));
        return (<React.Fragment>
            <ListGroup variant="flush">
                {notesFilter.map((note) => (
                    <NoteItem key={note.id} note={note} onClick={() => { this.onStartDeleteNote(note.id); }} />
                ))}
            </ListGroup>
            <SweetAlert
                show={this.state.showModal}
                title="Delete Note"
                text="Are you sure to want to delete?"
                showCancelButton
                onConfirm={this.confirmDeleteNote}
                onCancel={this.cancelDeleteNote}
            />
        </React.Fragment>)
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