import { formatEther } from "ethers";
import Ratings from "./Ratings";
import { useToggle } from "../context/ToggleContext";
import { useSelectedProduct } from "../context/SelectedProductContext";
import { DappazonProduct } from "../libs/contract";
const Product = ({ product }: { product: DappazonProduct }) => {
  const { toggle } = useToggle();
  const { select } = useSelectedProduct();
  const handleClick = () => {
    select(product);
    toggle();
  };
  return (
    <button
      className="hover:bg-slate-200 rounded-md p-2 flex flex-col items-start"
      onClick={handleClick}
    >
      <img src={product.image} width={320} height={320} alt={product.name} />
      <div className="px-2 py-2 flex flex-col gap-2 items-start">
        <p className="text-2xl">{product.name}</p>
        <Ratings rating={product.rating} />
        <p className="text-lg font-semibold">{formatEther(product.cost)} ETH</p>
      </div>
    </button>
  );
};
export default Product;
