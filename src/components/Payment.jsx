import { useState } from 'react';

export default function PaymentUI() {
  const [method, setMethod] = useState('upi');
  const [upiApp, setUpiApp] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    upiId: '',
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderData = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 99900 }) // ₹999 in paise
    }).then(res => res.json());

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // replace with your Razorpay key
      amount: orderData.amount,
      currency: "INR",
      name: "Premium Course",
      description: "Access to premium content",
      image: "https://your-logo-url.com/logo.png",
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
        // Optionally verify payment via backend
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },
      theme: {
        color: "#6366f1"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Product Info */}
        <div className="bg-indigo-600 text-white px-6 py-4">
          <h2 className="text-xl font-bold">🎓 Premium Course Access</h2>
          <p className="text-sm text-indigo-200">Unlock all features for just ₹999</p>
        </div>

        {/* User & Payment Form */}
        <div className="p-6 space-y-5">
          {/* User Info */}
          <div className="grid grid-cols-1 gap-4">
            <input name="name" value={user.name} onChange={handleInput} type="text" placeholder="Full Name" className="input" />
            <input name="email" value={user.email} onChange={handleInput} type="email" placeholder="Email Address" className="input" />
            <input name="phone" value={user.phone} onChange={handleInput} type="tel" placeholder="Phone Number" className="input" />
          </div>

          <button onClick={handlePayment} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition">
            Pay ₹9 with Razorpay
          </button>
        </div>
      </div>

      {/* Tailwind Custom Input Class */}
      <style>{`
        .input {
          @apply w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition;
        }
      `}</style>
    </div>
  );
}
