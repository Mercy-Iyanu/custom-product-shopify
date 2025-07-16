export interface ShopifyImage {
  originalSrc: string;
  altText: string;
}

export interface ShopifyVariant {
  id: string;
  price: {
    amount: string;
  };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
}
