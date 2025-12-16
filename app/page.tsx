import FloatingCart from "./components/CartHeader";
import ProductList from "./components/ProductList";
import Notification from "./components/Notification";
import PageContainer from "./components/PageContainer";
import HeroCarousel from "./components/Carousel/Carousel";
import shopifyClient from "./utils/shopifyClient";
import { getBanners } from "./utils/shopify.queries";
export default async function Home() {
  const { data, errors } = await shopifyClient.request(getBanners);
  const banners = data?.metaobjects?.edges.map((edge: any) => edge.node) ?? [];

  return (
    <PageContainer>
      <HeroCarousel banners={banners}/>
      <FloatingCart />
      <ProductList />
      <Notification />
    </PageContainer>
  );
}
