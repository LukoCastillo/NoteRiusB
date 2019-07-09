import React from 'react';
import NoteList from '../components/noteList';
import ActionBar from '../components/actionBar';


class Home extends React.Component {
    render() {
        return (<div className="homePage">
            <ActionBar />
            <NoteList />
        </div>);
    }
}

export default Home;


