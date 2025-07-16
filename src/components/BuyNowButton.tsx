"use client";

interface BuyNowButtonProps {
  variantId: string;
}

export default function BuyNowButton({ variantId }: BuyNowButtonProps) {
  const handleBuyNow = async () => {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      body: JSON.stringify({ variantId }),
    });

    const data = await res.json();
    window.location.href = data.checkoutUrl;
  };

  return (
    <button type="button" className="buy-now-button" onClick={handleBuyNow}>
      Buy Now
    </button>
  );
}
