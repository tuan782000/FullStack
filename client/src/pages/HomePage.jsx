import React from 'react';
import { Announcement, Categories, Navbar, Slider } from '../components';

const HomePage = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
        </div>
    );
};

export default HomePage;
