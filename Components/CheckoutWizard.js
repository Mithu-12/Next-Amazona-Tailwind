import React from 'react';

export default function CheckoutWizard({ activeState = 0 }) {
  return (
    <div className="flex mb-5 flex-wrap">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center
        ${
          index <= activeState
            ? 'border-orange-500 text-orange-500 font-bold'
            : 'border-gray-400 text-gray-400'
        }
        `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
