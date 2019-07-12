import React from 'react';
import NoteForm from '../components/NoteForm'



class CreateNote extends React.Component {
    render() {
        return (
            <div className="createNote">
                <h4>Create a new note</h4>
                <NoteForm />
            </div>
        );
    }
}


export default CreateNote;