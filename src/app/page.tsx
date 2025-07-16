// app/page.tsx
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT } from "@/lib/queries";
import { ShopifyProduct } from "./types";
import BuyNowButton from "@/components/BuyNowButton";
import ProductGallery from "@/components/ProductGallery";
import "./styles/ProductPage.css";

export default async function ProductPage() {
  const data = await shopifyFetch(GET_PRODUCT, {
    handle: "protein-powder",
  });

  const product: ShopifyProduct = data.productByHandle;
  if (!product) return <main>Ahh! Product not found.</main>;

  const images = product.images.edges.map((edge) => edge.node);
  const variantId = product.variants.edges[0].node.id;

  return (
    <main className="product-page">
      <ProductGallery images={images} />
      <div className="product-details">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className="price">₦{product.variants.edges[0].node.price.amount}</p>
        <BuyNowButton variantId={variantId} />
      </div>
    </main>
  );
}
