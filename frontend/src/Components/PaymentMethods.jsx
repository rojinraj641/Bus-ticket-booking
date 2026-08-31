import { CreditCard, Smartphone, Wallet } from "lucide-react";

function PaymentMethods({ selectedMethod, onMethodChange, onProceedToPay }) {
  const paymentOptions = [
    { id: 'credit-card', label: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
    { id: 'debit-card', label: 'Debit Card', icon: CreditCard, desc: 'All major banks' },
    { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, PhonePe wallet' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100 w-full overflow-hidden">
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-[#111827]">Select Payment Method</h3>
        <p className="text-xs text-[#4B5563] mt-0.5">Choose your preferred way to pay</p>
      </div>

      <div className="p-4 sm:p-5 space-y-2.5">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onMethodChange(option.id)}
            className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border-2 transition-all duration-200 text-left ${
              selectedMethod === option.id
                ? 'border-[#2563EB] bg-blue-50/70 shadow-sm shadow-blue-100'
                : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              selectedMethod === option.id
                ? 'bg-[#2563EB] text-white'
                : 'bg-slate-100 text-[#4B5563]'
            }`}>
              <option.icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold transition-colors ${
                selectedMethod === option.id ? 'text-[#111827]' : 'text-[#111827]'
              }`}>
                {option.label}
              </p>
              <p className="text-[11px] text-[#4B5563] mt-0.5">{option.desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
              selectedMethod === option.id
                ? 'border-[#2563EB] bg-[#2563EB]'
                : 'border-slate-300'
            }`}>
              {selectedMethod === option.id && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-5 pb-5 sm:pb-6">
        <button
          onClick={onProceedToPay}
          disabled={!selectedMethod}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
            selectedMethod
              ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-200 active:scale-[0.98]'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedMethod ? 'Proceed to Pay' : 'Select a method to continue'}
        </button>
      </div>
    </div>
  );
}

export default PaymentMethods;