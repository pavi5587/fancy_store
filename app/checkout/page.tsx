"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/lib/data";
import { formatINR } from "@/lib/format";
import CouponInput from "@/components/CouponInput";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import { Coupon, Address } from "@/lib/types";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const router = useRouter();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [address, setAddress] = useState<Address>({
    name: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");

  const lines = cart
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((x): x is { line: typeof cart[0]; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(x.product));

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0);
  const shipping = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const discount = coupon ? (coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value) : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  function validate() {
    const next: Partial<Record<keyof Address, string>> = {};
    if (!address.name.trim()) next.name = "Enter the recipient's name";
    if (!address.line1.trim()) next.line1 = "Enter a delivery address";
    if (!address.city.trim()) next.city = "Enter a city";
    if (!address.state.trim()) next.state = "Enter a state";
    if (!/^\d{6}$/.test(address.pincode)) next.pincode = "Enter a valid 6-digit pincode";
    if (!/^\d{10}$/.test(address.phone)) next.phone = "Enter a valid 10-digit phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function placeOrder(paymentId?: string) {
    const orderId = `AKY${Math.floor(10000 + Math.random() * 89999)}`;
    clearCart();
    router.push(`/orders/${orderId}?placed=1`);
  }

  function handleCodOrder() {
    if (!validate()) return;
    placeOrder();
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">Nothing to check out</h1>
        <p className="text-plum-400">Your cart is empty right now.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display text-3xl md:text-4xl text-ink mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Address */}
          <div>
            <h2 className="font-display text-xl text-ink mb-4">Delivery address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.name}>
                <input
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="input"
                  inputMode="numeric"
                />
              </Field>
              <Field label="Address" error={errors.line1} full>
                <input
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  className="input"
                  placeholder="House no, street, area"
                />
              </Field>
              <Field label="City" error={errors.city}>
                <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input" />
              </Field>
              <Field label="State" error={errors.state}>
                <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="input" />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="input"
                  inputMode="numeric"
                />
              </Field>
              <Field label="Email (for order updates)">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" />
              </Field>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <h2 className="font-display text-xl text-ink mb-4">Payment method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 border border-gold-200 rounded-lg p-4 cursor-pointer has-[:checked]:border-gold-500">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="accent-gold-600"
                />
                <div>
                  <p className="text-sm font-medium text-ink">Cards, UPI & wallets (Razorpay)</p>
                  <p className="text-xs text-plum-400">Pay securely via Razorpay checkout</p>
                </div>
              </label>
              <label className="flex items-center gap-3 border border-gold-200 rounded-lg p-4 cursor-pointer has-[:checked]:border-gold-500">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-gold-600"
                />
                <div>
                  <p className="text-sm font-medium text-ink">Cash on delivery</p>
                  <p className="text-xs text-plum-400">Pay when your order arrives</p>
                </div>
              </label>
            </div>
          </div>

          <CouponInput subtotal={subtotal} applied={coupon} onApply={setCoupon} onRemove={() => setCoupon(null)} />
        </div>

        {/* Summary */}
        <div className="border border-gold-200 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl text-ink mb-4">Order summary</h2>
          <div className="space-y-4 mb-4 max-h-52 overflow-auto pr-1">
            {lines.map(({ line, product }) => (
              <div key={`${product.id}-${line.color}`} className="flex gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-blush shrink-0">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-ink line-clamp-1">{product.name}</p>
                  <p className="text-plum-400 text-xs">Qty {line.quantity}{line.color ? ` · ${line.color}` : ""}</p>
                </div>
                <p className="text-sm text-ink">{formatINR(product.price * line.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-plum-600 border-t border-gold-200 pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-gold-600">
                <span>Coupon ({coupon?.code})</span>
                <span>− {formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
          </div>
          <div className="border-t border-gold-200 mt-4 pt-4 flex justify-between font-medium text-ink mb-6">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>

          {paymentMethod === "razorpay" ? (
            <div>
              <RazorpayCheckoutButton
                amount={total}
                name={address.name || "Customer"}
                email={email || "customer@example.com"}
                contact={address.phone || "9999999999"}
                onBeforeOpen={validate}
                onSuccess={(paymentId) => placeOrder(paymentId)}
              />
              <p className="text-xs text-plum-400 mt-3 text-center">Test mode — no real charge will be made.</p>
            </div>
          ) : (
            <button
              onClick={handleCodOrder}
              className="w-full bg-ink text-ivory rounded-full py-3.5 text-sm font-medium hover:bg-plum-600 transition-colors focus-ring"
            >
              Place order (Cash on delivery)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-xs text-plum-600 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-plum-600 mt-1">{error}</p>}
    </div>
  );
}
