import Product from "./Product";
import { DappazonProduct } from "./Product";
const ProductList = ({ productList }: { productList: DappazonProduct[] }) => (
  <div className="flex items-center justify-around gap-6">
    {productList.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </div>
);
export default ProductList;
