import ProductList from "../components/ProductList";
import { BestSeller } from "../components/Navigation";
const BestSellers = ({ bestSellers }: { bestSellers: BestSeller[] }) => {
  return (
    <section className="w-[1250px]">
      <h3 className="text-4xl font-bold py-6">Dappazon Best Sellers</h3>
      {bestSellers.map((item) => (
        <div key={item.hash} className="relative">
          <div className="absolute -top-[100px]" id={item.hash.slice(1)}></div>
          <h4 className="text-3xl font-bold">{item.name}</h4>
          <div className="h-[2px] bg-[#9f9f9f] my-8"></div>
          <ProductList productList={item.productList} />
        </div>
      ))}
    </section>
  );
};
export default BestSellers;
