import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReactSlider = ()=>{
    const settings = {
        dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 5000,
      cssEase: "linear"
      };
    return ( <div style={{width:'100%',height:'300px'}}>
        <Slider {...settings}>
        <div>
           <img src="https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/31/img18/Fresh/GW/Jan24/1st_Fresh_GW_Hero_PC1x_RC._CB587151266_.jpg" alt="hello" style={{width:'100%',height:'300px'}}/>
          </div>
          <div>
           <img src="https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_792452-T2/images/G/31/Symbol/2024/GWHeros/Jan/1st/Revised/Prime/EOSS_PC_men_3000._CB587070722_.jpg" alt="hello" style={{width:'100%',height:'300px'}}/>
          </div>
        </Slider>
      </div>)
}

export default ReactSlider;