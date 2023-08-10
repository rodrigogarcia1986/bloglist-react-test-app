import { useSelector } from 'react-redux'

function Notification() {

  const notification = useSelector(state => state.notification)
  console.log('notification state:', notification)

  if (notification === null) {
    return null
  } else {
    return (
      <div>
        <p className="notification">{notification}</p>
      </div>
    )
  }
}

export default Notification
