import React from 'react'

function Notification({notificationMsg}) {
    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#28a745',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                textAlign: 'center',
                fontWeight: 'bold',
            }}
        >
            {notificationMsg}
        </div>
    )
}

export default Notification