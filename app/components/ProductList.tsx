import Card from "./ProductCard/Card";

export default async function ProductList() {
  const res = await fetch(`http://${process.env.PUBLIC_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  const products = data.products.edges || [];

  return (
    <div className="lg:container flex flex-col md:flex-row lg:flex-row gap-2 lg:gap-2 justify-start flex-wrap items-start mt-20 z-0">
      {products &&
        products.map(({ node }: any) => <Card key={node.id} props={node} />)}
    </div>
  );
}
