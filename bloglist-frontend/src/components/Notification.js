function Notification({ notification }) {
  console.log('Data received at Notification component', notification)

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
