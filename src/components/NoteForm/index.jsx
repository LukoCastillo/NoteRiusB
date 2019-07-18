import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNote } from '../../redux/actions/note-actions';
import { insertTabTextArea } from '../../common/commonFunctions';
import uuid from "uuid";

import { withRouter } from 'react-router-dom';

class NoteForm extends React.Component {
    onSaveNote = () => {
        let txtTitle = this.noteTitle.value;
        let txtBody = this.noteText.value;
        let _id = this.noteId.value;

        if (_id === "")
            _id = uuid.v4();

        this.props.onUpdateNote(this.props.user._id, { id: _id, title: txtTitle, body: txtBody });
        this.props.history.push('/home');
    }
    componentDidMount() {
        let noteId = this.props.match.params.id;
        if (typeof noteId !== 'undefined') {
            let note = this.props.notes.filter((n) => n.id === noteId);
            this.fillNote(note[0]);
        }
    }
    fillNote = (note) => {
        if (!note) return;
        let updateNote = Object.assign({}, note);
        this.noteTitle.value = updateNote.title;
        this.noteText.value = updateNote.body;
        this.noteId.value = updateNote.id;
    }
    insertTab = (event) => {
        insertTabTextArea(event);
    }
    render() {
        return (<div className="noteForm">
            <Button variant="primary" size="sm" className="float-right btnCreateNote"
                onClick={this.onSaveNote}>Save note</Button>
            <input type="hidden" ref={(noteId) => this.noteId = noteId} />
            <Form.Control type="text"
                placeholder="Type here the note title"
                ref={(noteTitle) => this.noteTitle = noteTitle} className="inputForm txtNoteTitle" />
            <br />
            <Form.Control as="textarea" rows="15"
                placeholder="Type here your note."
                ref={(noteText) => this.noteText = noteText}
                className="inputForm txtNoteBody"
                onKeyDown={this.insertTab}
                onKeyUp={this.insertTab}
                onKeyPress={this.insertTab}
            />
        </div>);
    }
}



const mapStateToProps = (state, props) => {
    return {
        notes: state.notes,
        user: state.login
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onUpdateNote: updateNote
    }, dispatch)
};


export default connect(mapStateToProps, mapActionToProps, null)(withRouter(NoteForm));

