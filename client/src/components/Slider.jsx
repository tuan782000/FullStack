import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from '../../data';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;

    /* slide */
    overflow: hidden;
`;

// Này như 1 component nhỏ truyền prop để dữ liệu dynamic
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === 'left' && '10px'};
    right: ${props => props.direction === 'right' && '10px'};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;

    // slide
    z-index: 2; // để cho 2 nút trồi lên - khỏi slide
`;

const Wrapper = styled.div`
    height: '100%';
    display: flex;

    // slide - 0 ảnh đầu tiên - ảnh tiếp theo -100vw - ảnh tiếp theo -200vw
    /* transform: translateX(-100vw); */
    /* transform: translateX(-200vw); */
    /* slideIndex * -100vw */
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;

    /* slide */
    background-color: #${props => props.bg};
`;
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
`;

const Image = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0); // như logic trên 0 , -100vw, -200vw,... để chuyển đổi giữa các slide
    const handleClick = direction => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2); // nếu slide index > 0 thì (- xuống 1 đơn vị) không thì ngược lại slideIndex 0 - chuyển ngược lại lên cao nhất
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction='left' onClick={() => handleClick('left')}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => {
                    return (
                        <Slide bg={item.bg} key={item.id}>
                            <ImgContainer>
                                <Image src={item.img} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Button>SHOW NOW</Button>
                            </InfoContainer>
                        </Slide>
                    );
                })}
            </Wrapper>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    );
};

export default Slider;
