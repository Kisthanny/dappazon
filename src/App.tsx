import { useEffect, useState } from "react";
import Navigation, { BestSeller } from "./components/Navigation";
import BestSellers from "./pages/BestSellers";
import { getAccounts, onAccountsChanged } from "./libs/wallet";
import { getDappazon, computeBestSellers } from "./libs/contract";
import { DappazonProduct } from "./components/Product";
function App() {
  const [accounts, setAccounts] = useState([""]);
  const [itemList, setItemList] = useState([] as DappazonProduct[]);
  const [bestSellers, setBestSellers] = useState([] as BestSeller[]);
  const account = accounts[0];
  const dappazon = getDappazon();

  const getItemList = async () => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      const item: DappazonProduct = await dappazon.itemList(i + 1);
      result.push(item);
    }
    return result;
  };

  const updateAccounts = async () => {
    setAccounts(await getAccounts());
  };

  const onMounted = async () => {
    updateAccounts();
    onAccountsChanged(updateAccounts);
    const result = await getItemList();
    setItemList(result);
    setBestSellers(computeBestSellers(result));
  };

  useEffect(() => {
    onMounted();
  }, []);

  return (
    <main className="bg-white w-full h-screen">
      <Navigation account={account} bestSellers={bestSellers} />
      <section className="flex flex-col items-center mt-[100px]">
        <BestSellers bestSellers={bestSellers} />
      </section>
    </main>
  );
}

export default App;
