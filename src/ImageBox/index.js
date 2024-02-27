import './index.css'

const ImageBox = props => {
  const {items, imageClick} = props
  const {thumbnailUrl} = items

  const imageOnClick = () => {
    imageClick(thumbnailUrl)
  }

  return (
    <li className="lists-div">
      <button type="button">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          height="100"
          width="90"
          onClick={imageOnClick}
        />
      </button>
    </li>
  )
}

export default ImageBox
