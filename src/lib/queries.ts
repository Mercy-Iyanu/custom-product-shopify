export const GET_PRODUCT = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
            }
          }
        }
      }
    }
  }
`;
