"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckoutButton({
  amount,
  name,
  email,
  contact,
  onSuccess,
  onBeforeOpen,
}: {
  amount: number; // in INR
  name: string;
  email: string;
  contact: string;
  onSuccess: (paymentId: string) => void;
  onBeforeOpen?: () => boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxxxxx";

  async function handlePay() {
    if (onBeforeOpen && !onBeforeOpen()) return;
    setLoading(true);
    const ok = await loadRazorpayScript();
    setLoading(false);

    if (!ok) {
      alert("Could not load Razorpay. Check your connection and try again.");
      return;
    }

    // In production: create an order server-side via Razorpay Orders API
    // and pass the returned order_id below instead of amount-only checkout.
    const options = {
      key: keyId,
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      name: "Aikya Fine Accessories",
      description: "Order payment",
      image: "/logo.png",
      prefill: { name, email, contact },
      theme: { color: "#5C2338" },
      handler: function (response: { razorpay_payment_id: string }) {
        onSuccess(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          // user closed the payment sheet without paying
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function () {
      alert("Payment failed. Please try again or use a different payment method.");
    });
    rzp.open();
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="w-full bg-ink text-ivory rounded-full py-3.5 text-sm font-medium hover:bg-plum-600 transition-colors disabled:opacity-60 focus-ring"
    >
      {loading ? "Loading payment..." : `Pay with Razorpay — securely`}
    </button>
  );
}
