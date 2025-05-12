import React from 'react';

function PaymentMethods({ selectedMethod, onMethodChange, onProceedToPay }) {
  const paymentOptions = [
    { id: 'credit-card', label: 'Credit Card', icon: 'fa-credit-card' },
    { id: 'debit-card', label: 'Debit Card', icon: 'fa-credit-card' },
    { id: 'upi', label: 'UPI', icon: 'fa-mobile-alt' },
    { id: 'wallet', label: 'Wallet', icon: 'fa-wallet' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Methods</h3>
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div 
            key={option.id} 
            className={`flex items-center border rounded-lg p-3 cursor-pointer transition duration-150
              ${selectedMethod === option.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => onMethodChange(option.id)}
          >
            <input 
              type="radio" 
              id={option.id} 
              name="payment-method" 
              checked={selectedMethod === option.id}
              onChange={() => onMethodChange(option.id)}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150"
            />
            <label htmlFor={option.id} className="ml-3 flex-grow cursor-pointer">
              <div className="flex items-center">
                <i className={`fas ${option.icon} mr-3 text-gray-500`}></i>
                {option.label}
              </div>
            </label>
          </div>
        ))}
      </div>
      <button 
        onClick={onProceedToPay}
        className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition duration-150"
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export default PaymentMethods;