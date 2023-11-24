function GameDetailsContainer({title, imageUrl, description, rating, price, genre, platform}) {

    return (
        <div className="PageContainer">
          <h1 className="TitleAdd">
            {title.toUpperCase() === "" ? "TITLE" : title.toUpperCase()}
          </h1>
          <div className="GameAddContainer">
            <div className="InfoDiv">
              <div className="ImageDescriptionDiv">
                <div className="ImageAdd">
                  {imageUrl === "" ? (
                    ""
                  ) : (
                    <img src={imageUrl}
                      style={{ width: "460px", height: "216px", objectFit: "cover", borderRadius: "30px" }} />
                  )}
                </div>
                <p>
                  {description === ""
                    ? "Brief description about the game..."
                    : description}
                </p>
              </div>
              <div className="hr"></div>
              <div className="StatisticsAdd">
                <div className="RatingPriceAdd">
                  <h3>RATING</h3>
                  <p>{rating === "" ? "?" : rating}/10</p>
                  <h3 className="PriceH3">PRICE</h3>
                  <p>{price === "" || price == 0 ? "FREE" : `${price}€`}</p>
                </div>
                <div className="PlatformGenreAdd">
                  <h3 className="GenresH3">GENRES</h3>
                  <div className="ButtonsAdd">
                    {genre === "" ? (
                      <p>No genres</p>
                    ) : (
                      genre.map((genre, index) => (
                        <button key={index}>{genre}</button>
                      ))
                    )}
                  </div>
                  <h3 className="PlatformsH3">PLATFORMS</h3>
                  <div className="ButtonsAdd">
                    {platform === "" ? (
                      <p>No platforms</p>
                    ) : (
                      platform.map((platform, index) => (
                        <button key={index}>{platform}</button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default GameDetailsContainer