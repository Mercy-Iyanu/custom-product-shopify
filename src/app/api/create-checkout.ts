// app/api/create-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { variantId } = body;

  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            lineItems: [{ variantId, quantity: 1 }],
          },
        },
      }),
    }
  );

  const data = await response.json();

  if (data.errors || data.data.checkoutCreate.userErrors.length > 0) {
    console.error("Shopify error:", data.errors || data.data.checkoutCreate.userErrors);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }

  const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;

  return NextResponse.json({ checkoutUrl });
}
