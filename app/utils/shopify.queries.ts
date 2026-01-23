export const getProducts = `query{
 products(sortKey: TITLE, first: 50) {
    edges {
      node {
        id
        title
        handle
        vendor
        featuredImage{
          url
        }
      }
    }
  }
}`;

export const getBanners = `{
  metaobjects(type: "homepage_banner", first: 50) {
    edges {
      node {
        id
        handle 
        type
        fields {
          key
          value
          type
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}`;

export const getProductListCategory = `
query GetCollectionByHandle($handle: String!, $first: Int!){
  collection(handle: $handle){
    title
    id
    products(first:$first){
      edges{
        node{
          title
          id
          handle
          vendor
          featuredImage{
            url
          }
        }
      }
    }
  }
}`;
