import { formatEther } from "ethers";
import { useToggle } from "../context/ToggleContext";
import Ratings from "./Ratings";
import { useSelectedProduct } from "../context/SelectedProductContext";
import { stopPropagation } from "../libs/document";
import { useEffect, useState } from "react";
import {
  Order,
  formatTimestamp,
  dappazonBuy,
  getOrders,
} from "../libs/contract";

const ProductDetail = ({ onBuyEvent }: { onBuyEvent: Function }) => {
  const { toggleValue, toggle } = useToggle();
  const { product } = useSelectedProduct();
  const [filteredOrders, setFilteredOrders] = useState([] as Order[]);

  const updateOrders = async () => {
    const orders = await getOrders();
    setFilteredOrders(orders.filter((order) => order.item.id === product.id));
  };

  const handleBuy = async () => {
    await dappazonBuy(product);
    updateOrders();
    onBuyEvent();
  };

  useEffect(() => {
    updateOrders();
    // eslint-disable-next-line
  }, [product]);

  if (toggleValue) {
    return (
      <div
        className={`bg-black bg-opacity-80 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`}
        onClick={toggle}
      >
        <div
          className="bg-white p-10 rounded-2xl flex gap-10 relative"
          onClick={stopPropagation}
        >
          <div className="flex items-center justify-center">
            <img
              width={350}
              height={350}
              className="rounded-2xl"
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="max-w-sm flex flex-col gap-2">
            <p className="text-3xl font-bold">{product.name}</p>
            <Ratings rating={product.rating} />
            <div className="divide-line-sm"></div>
            <p className="text-3xl font-bold">
              {formatEther(product.cost)} ETH
            </p>
            <div className="divide-line-sm"></div>
            <h2 className="text-3xl font-bold">Overview</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              architecto officia ipsum reprehenderit voluptate eligendi
              veritatis delectus est? Modi iusto enim iste officia aliquam,
              repudiandae dolore quam accusantium cupiditate optio.
            </p>
          </div>
          <div className="max-w-sm border border-black rounded-2xl p-4 flex flex-col gap-4">
            <p className="text-3xl font-bold">
              {formatEther(product.cost)} ETH
            </p>
            <p>
              FREE delivery
              <br />
              <strong className="text-xl font-bold">
                {new Date(Date.now() + 86400000).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
            <p className={`${product.stock ? "" : "text-red-400"}`}>
              {product.stock ? "In Stock" : "Out of Stock"}
            </p>
            <button
              disabled={!product.stock}
              className={`bg-[#ff9900] px-10 py-2 rounded-full font-semibold disabled:bg-gray-400`}
              onClick={handleBuy}
            >
              {product.stock ? "Buy Now" : "Restocking..."}
            </button>
            <p>
              Ships from <span className="font-semibold">Dappazon</span>
            </p>
            <p>
              Sold by <span className="font-semibold">Dappazon</span>
            </p>
            {filteredOrders.map((order) => (
              <div
                key={order.time}
                className="shadow-sm shadow-slate-400 p-2 rounded-2xl"
              >
                <p>Item bought on</p>
                <p className="font-bold">{formatTimestamp(order.time)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
export default ProductDetail;
