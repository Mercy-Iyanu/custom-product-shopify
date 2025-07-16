"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  originalSrc: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="product-images">
      <Image
        className="main-image"
        src={activeImage.originalSrc}
        alt={activeImage.altText ?? "Product Image"}
        width={600}
        height={400}
      />
      <div className="thumbnail-row">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.originalSrc}
            alt={img.altText ?? `Thumbnail ${index + 1}`}
            width={100}
            height={100}
            className={`thumbnail-image ${
              img.originalSrc === activeImage.originalSrc ? "active" : ""
            }`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
