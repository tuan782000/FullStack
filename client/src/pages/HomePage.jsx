import React from 'react';
import {
    Announcement,
    Categories,
    Footer,
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
            <Footer />
        </div>
    );
};

export default HomePage;
