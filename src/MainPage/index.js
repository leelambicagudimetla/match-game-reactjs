import {Component} from 'react'
import './index.css'
import ImageBox from '../ImageBox'
import TabList from '../TabList'

class MainPage extends Component {
  state = {
    score: 0,
    time: 60,
    isTrue: false,
    category: 'FRUIT',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
  }

  componentDidMount() {
    this.timerId = setInterval(this.statusChange, 1000)
  }

  playAgain = () => {
    this.setState({
      isTrue: false,
      score: 0,
      time: 60,

      imgUrl:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    })
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({isTrue: !prevState.isTrue}))
    }
  }

  imageClick = thumbnailUrl => {
    const {imgUrl} = this.state
    const {imagesList} = this.props
    const imageValue = imagesList.filter(
      eachValue => eachValue.thumbnailUrl === thumbnailUrl,
    )
    const {imageUrl} = imageValue[0]
    if (imageUrl === imgUrl) {
      const newImgUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      console.log(newImgUrl)
      this.setState(prevState => ({
        score: prevState.score + 1,
        imgUrl: newImgUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({isTrue: !prevState.isTrue}))
    }
  }

  onResultTabs = value => {
    this.setState({category: value})
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {isTrue, category, imgUrl, time, score, num} = this.state
    const thumbnailList = imagesList.filter(
      eachValue => eachValue.category === category,
    )

    return (
      <div className="back-div-con">
        <nav className="main-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
            alt="website logo"
            height="50"
          />
          <ul className="score-div">
            <li>
              <p className="score-para">Score: {score} </p>
            </li>

            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              height="30"
            />
            <li>
              <p className="score-para">{time} sec</p>
            </li>
          </ul>
        </nav>
        {!isTrue ? (
          <div className="sec-div">
            <img src={imgUrl} alt="match" className="main-image" />

            <ul className="button-list-div">
              {tabsList.map(each => (
                <TabList
                  key={each.tabId}
                  onResultTabs={this.onResultTabs}
                  item={each}
                />
              ))}
            </ul>
            <ul className="image-places">
              {thumbnailList.map(each => (
                <ImageBox
                  key={each.id}
                  imageClick={this.imageClick}
                  items={each}
                  num={num}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="second-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              height="200"
              alt="trophy"
            />
            <p className="main-heading">YOUR SCORE</p>
            <p className="your-score">{score}</p>
            <button
              type="button"
              className="play-button"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                className="restart"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default MainPage
