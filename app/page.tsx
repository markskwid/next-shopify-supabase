import Notification from "./components/Notification";
import PageContainer from "./components/PageContainer";
import HeroCarousel from "./components/Carousel/Carousel";
import shopifyClient from "./utils/shopifyClient";
import { getBanners, getProductListCategory } from "./utils/shopify.queries";
import ProductListCategory from "./components/Carousel/ProductListCategory";
export default async function Home() {
  const [bannerRes, homegifts, shirts, men, women] = await Promise.all([
    shopifyClient.request(getBanners),
    shopifyClient.request(getProductListCategory, {
      variables: {
        handle: "home-gifts",
        first: 10,
      },
    }),
    shopifyClient.request(getProductListCategory, {
      variables: {
        handle: "shirts",
        first: 10,
      },
    }),
    shopifyClient.request(getProductListCategory, {
      variables: {
        handle: "men",
        first: 10,
      },
    }),
    shopifyClient.request(getProductListCategory, {
      variables: {
        handle: "women",
        first: 10,
      },
    }),
  ]);
  const banners =
    bannerRes.data?.metaobjects?.edges.map((edge: any) => edge.node) ?? [];
  const prodsHomeGifts = homegifts.data?.collection ?? [];
  const prodsShirts = shirts.data?.collection ?? [];
  const prodsMen = men.data?.collection ?? [];
  const prodsWomen = women.data?.collection ?? [];

  console.log(shirts.data);

  return (
    <PageContainer>
      <HeroCarousel banners={banners} />
      <ProductListCategory collection={prodsHomeGifts} />
      <ProductListCategory collection={prodsShirts} />
      <ProductListCategory collection={prodsMen} />
      <ProductListCategory collection={prodsWomen} />
      <Notification />
    </PageContainer>
  );
}
