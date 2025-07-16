// app/page.tsx
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT } from "@/lib/queries";
import { ShopifyProduct } from "./types";
import BuyNowButton from "@/components/BuyNowButton";

export default async function ProductPage() {
  // Server-side fetch at build or request time
  const data = await shopifyFetch(GET_PRODUCT, {
    handle: "protein-powder", // 👈 update with actual handle
  });

  const product: ShopifyProduct = data.productByHandle;
  const variantId = product.variants.edges[0].node.id;
  const image = product.images.edges[0].node;

  return (
    <main className="product-page">
      <h1>{product.title}</h1>
      <Image
        src={image.originalSrc}
        alt={image.altText ?? "Product Image"}
        width={600}
        height={400}
      />
      <p>{product.description}</p>
      <p>₦{product.variants.edges[0].node.price.amount}</p>

      <BuyNowButton variantId={variantId} />
    </main>
  );
}
