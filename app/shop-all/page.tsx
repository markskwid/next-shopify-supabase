import PageContainer from "../components/PageContainer";
import ProductList from "../components/ProductList";

export default function ShopAll() {
  return (
    <PageContainer>
      <div className="mt-10">
        <ProductList />
      </div>
    </PageContainer>
  );
}
