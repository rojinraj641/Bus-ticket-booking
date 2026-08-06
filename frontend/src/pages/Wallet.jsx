import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Plus, History, CreditCard, ArrowUpRight, ArrowDownLeft, Smartphone, Wallet as WalletIcon, Trash2, ChevronRight } from 'lucide-react';

const transactions = [
  { id: 1, type: 'credit', title: 'Added Money', subtitle: 'via UPI', amount: 500, date: 'Aug 5, 2026' },
  { id: 2, type: 'debit', title: 'Bus Booking - Hyderabad to Vijayawada', subtitle: 'Ticket #BMT4521', amount: 350, date: 'Aug 3, 2026' },
  { id: 3, type: 'credit', title: 'Refund', subtitle: 'Cancelled booking #BMT4498', amount: 200, date: 'Jul 29, 2026' },
  { id: 4, type: 'debit', title: 'Bus Booking - Hyderabad to Bengaluru', subtitle: 'Ticket #BMT4470', amount: 620, date: 'Jul 22, 2026' },
];

const paymentMethods = [
  { id: 1, type: 'card', label: 'Visa •••• 4242', icon: CreditCard },
  { id: 2, type: 'upi', label: 'UPI - rojin@okhdfc', icon: Smartphone },
];

const Wallet = () => {
  return (
    <>
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#F8FAFC] min-h-screen">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wallet</h1>
        </div>

        {/* Wallet Balance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/10" />

          <div className="relative flex items-center justify-between mb-6">
            <div>
              <p className="text-sm sm:text-base font-medium text-blue-100">Available Balance</p>
              <p className="text-3xl sm:text-4xl font-extrabold mt-2">$10.00</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <WalletIcon size={24} strokeWidth={2} />
            </div>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition">
              <Plus size={18} /> Add Money
            </button>
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto border border-white/70 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white hover:text-blue-700 transition">
              <History size={18} /> Transaction History
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Plus size={16} /> Add New
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <Icon size={20} />
                    </div>
                    <p className="font-medium text-gray-800">{method.label}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}

            {paymentMethods.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-6">No payment methods added yet.</p>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tx.title}</p>
                    <p className="text-sm text-gray-500">{tx.subtitle} · {tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}

            {transactions.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-6">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
