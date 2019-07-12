import React from 'react';
import HeaderApp from '../components/header';
import Routering from '../router';

function Layout() {
    return (
        <div className="App">
            <HeaderApp />
            <Routering />
        </div>
    );
}

export default Layout;
