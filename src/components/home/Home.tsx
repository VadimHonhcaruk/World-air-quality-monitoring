import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomSlide } from "./CustomSlide/CustomSlide";
import { Subtitle } from "./Subtitle/Subtitle";

interface ISliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  autoplay: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  autoplaySpeed: number;
  pauseOnHover: boolean;
  draggable: boolean;
  arrows: boolean;
}

const Home = () => {
  const settings: ISliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    draggable: false,
    arrows: false,
  };

  return (
    <div>
      <Subtitle />
      <Slider {...settings}>
        <CustomSlide alt="1" path={require("../../images/p1.jpg")} />
        <CustomSlide alt="2" path={require("../../images/p2.jpg")} />
        <CustomSlide alt="3" path={require("../../images/p3.png")} />
        <CustomSlide alt="4" path={require("../../images/p4.jpg")} />
      </Slider>
    </div>
  );
};

export default Home;
