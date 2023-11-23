import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";

function GameInfo(props) {
  const [slide, setSlide] = useState(0);

    const nextSlide = () => {
      setSlide(slide === props.game.images.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
      setSlide(slide === 0 ? props.game.images.length - 1 : slide - 1);
    };
    
  function fixedUrl(url) {
    if (url.length === 0) return "";
    const fixedUrl = url.replace("watch?v=", "embed/");

    return fixedUrl;
  }

  return (
    <div>
      <h1 className="GameInfoTitle">{props.game.title}</h1>

      <div className="AllGameInfo">
        <div className="ImageDescription">
          <img src={props.game.image_url} />
          <div className="Description">
            <p>{props.game.description}</p>
          </div>
        </div>
        <div className="hr"></div>
        <div className="StatisticsDiv">
          <div className="RatingPrice">
            <h3 className="NoMargin">RATING</h3>
            <p className="InfoValue">{props.game.rating}/10</p>
            <h3 className="NoMargin">PRICE</h3>
            {props.game.free ? (
              <p className="InfoValue">FREE</p>
            ) : (
              <p className="InfoValue">{props.game.price}€</p>
            )}
          </div>
          <div className="GenrePlatformButtons">
            <h3 className="NoMargin">GENRE</h3>
            <div className="InfoValue noMarginLeft">
              {props.game.genre.length <= 0 ? (
                <p>No genres</p>
              ) : (
                props.game.genre.map((genre, index) => (
                  <button key={index} className="GenreButton">
                    {genre}
                  </button>
                ))
              )}
            </div>
            <h3 className="NoMargin">PLATFORM</h3>
            <div className="InfoValue noMarginLeft">
              {props.game.platform.length <= 0 ? (
                <p>No platforms</p>
              ) : (
                props.game.platform.map((platform, index) => (
                  <button key={index} className="PlatformButton">
                    {platform}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="GameMedia">
          {props.game.video_url.length === 0 ? (
            <></>
          ) : (
            <div className="GameVideo">
              <iframe
                width="420"
                height="315"
                src={fixedUrl(props.game.video_url)}
                style={{
                  borderStyle: "none",
                }}
              ></iframe>
            </div>
          )}
          <div className="Carousel">
            <BsArrowLeftCircleFill
              className="Arrow ArrowLeft"
              onClick={prevSlide}
            />
            <div className="GameImages">
              {props.game.images === null || props.game.images.length <= 0 ? (
                <p></p>
              ) : (
                props.game.images.map((image, index) => (
                  <img
                    src={image}
                    key={index}
                    className={slide === index ? "Slide" : "Slide SlideHidden"}
                  />
                ))
              )}
              <span className="Indicators">
                {props.game.images.map((_, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setSlide(index)}
                      className={
                        slide === index
                          ? "Indicator"
                          : "Indicator IndicatorInactive"
                      }
                    ></button>
                  );
                })}
              </span>
            </div>
            <BsArrowRightCircleFill
                className="Arrow ArrowRight"
                onClick={nextSlide}
              />
          </div>
          {/* <div className="ScrollingWrapper">
            {props.game.images.length <= 0
              ? <p></p>
              : (props.game.images.map((image, index) => (
                <img className="card" src={image} key={index} />
              )))}
          </div>*/}
        </div> 

      </div>
    </div>
  );
}

export default GameInfo;
