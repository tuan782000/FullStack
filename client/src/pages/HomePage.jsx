import React from 'react';
import {
    Announcement,
    Categories,
    Navbar,
    Newsletter,
    Products,
    Slider
} from '../components';

const HomePage = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
        </div>
    );
};

export default HomePage;
