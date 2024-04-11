import { formatEther } from "ethers";
import Ratings from "./Ratings";
export type DappazonProduct = {
  id: number;
  name: string;
  category: string;
  image: string;
  cost: string;
  rating: number;
  stock: number;
};
const Product = ({ product }: { product: DappazonProduct }) => (
  <div>
    <img src={product.image} width={320} height={320} alt={product.name} />
    <div className="px-2 py-2 flex flex-col gap-2">
      <p className="text-2xl">{product.name}</p>
      <Ratings rating={product.rating} />
      <p className="text-lg font-semibold">{formatEther(product.cost)} ETH</p>
    </div>
  </div>
);
export default Product;
