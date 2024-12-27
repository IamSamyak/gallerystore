import React from 'react'

function PaymentsIconsContainer() {
    return (
        <div className="payment-icons">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/768px-Google_Pay_Logo.svg.png?20221017164555"
                alt="Google Pay"
                className="payment-icon"
            />
            <img
                src="https://th.bing.com/th?id=OIP.Yobol-DtbP0LEyrFnSYw6gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                alt="Visa"
                className="payment-icon"
            />
            <img
                src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg"
                alt="Paytm"
                className="payment-icon"
            />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="payment-icon"
            />
        </div>
    )
}

export default PaymentsIconsContainer