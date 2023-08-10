/* eslint-disable linebreak-style */
import { useSelector } from 'react-redux'
import { Warning } from '../styles'

function Notification() {

  const notification = useSelector(state => state.notification)
  console.log('notification state:', notification)

  if (notification === null) {
    return null
  } else {
    return (
      <Warning>
        <p className="notification">{notification}</p>
      </Warning>
    )
  }
}

export default Notification
