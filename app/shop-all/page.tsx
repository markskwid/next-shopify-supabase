import PageContainer from "../components/PageContainer";
import ProductList from "../components/ProductList";
import Notification from "../components/Notification";

export default function ShopAll() {
  return (
    <PageContainer>
      <div className="mt-10">
        <ProductList />
      </div>
      <Notification />
    </PageContainer>
  );
}
