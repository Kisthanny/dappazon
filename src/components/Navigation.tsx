import { formatAddress, requestAccounts } from "../libs/wallet";
import { DappazonProduct } from "./Product";

export type BestSeller = {
  name: string;
  hash: string;
  productList: DappazonProduct[];
};

const Navigation = ({
  account,
  bestSellers,
}: {
  account: string;
  bestSellers: BestSeller[];
}) => {
  return (
    <nav className="fixed w-full top-0 left-0 right-0 z-10">
      <div className="bg-[#131921] flex items-center justify-around py-3 px-8 gap-48">
        <h2 className="text-white font-extrabold font text-3xl">Dappazon</h2>
        <input type="text" className="rounded-sm flex-1" />
        <button
          className="bg-[#ff9900] px-8 py-1 rounded-sm font-bold"
          onClick={requestAccounts}
        >
          {account ? formatAddress(account) : "Connect"}
        </button>
      </div>
      <div className="bg-[#232f31] py-2 text-white flex items-center justify-center gap-8">
        {bestSellers.map((title) => (
          <a key={title.hash} href={title.hash}>
            {title.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
export default Navigation;
