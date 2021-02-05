import React from 'react'

const Alerts = ({ alerts }) => {

  const renderAlert = () => {
    return alerts.map((item, idx) => {
      return <div key={idx} className="alert-danger">{item}</div>
    })
  }

  return (
    <div className="alert">
      {renderAlert()}
    </div>
  )
}

export default Alerts
