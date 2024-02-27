import './index.css'

const TabList = props => {
  const {item, onResultTabs} = props
  const {displayText, tabId} = item

  const onTabResult = () => {
    console.log(tabId)
    onResultTabs(tabId)
  }

  return (
    <li>
      <button onClick={onTabResult} value={tabId} type="button">
        {displayText}
      </button>
    </li>
  )
}
export default TabList
