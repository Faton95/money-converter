import React  from "react";
import Slider from "react-slick";
import {Row, Col} from 'reactstrap'
export const CurrencySlider = ({currencyList}) => {

        const settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        }

        return (
            <div>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 5 }}>
                        <h2>Currency Info</h2>
                    </Col>
                </Row>
                <Slider {...settings}>
                    {Object.entries(currencyList).map((item, index) => {
                        return (
                            <div>
                                <h3>{item[0]}:{item[1]}</h3>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
}

