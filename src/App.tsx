import { useEffect, useState } from "react";
import Navigation, { BestSeller } from "./components/Navigation";
import ProductDetail from "./components/ProductDetail";
import BestSellers from "./pages/BestSellers";
import { getAccounts, onAccountsChanged } from "./libs/wallet";
import { getDappazon, computeBestSellers } from "./libs/contract";
import { DappazonProduct } from "./libs/contract";
import { ToggleProvider } from "./context/ToggleContext";
import { SelectedProductProvider } from "./context/SelectedProductContext";
function App() {
  const [accounts, setAccounts] = useState([""]);
  const [bestSellers, setBestSellers] = useState([] as BestSeller[]);
  const account = accounts[0];
  const dappazon = getDappazon();

  const getItemList = async () => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      const item: DappazonProduct = (await dappazon.itemList(
        i + 1
      )) as unknown as DappazonProduct;
      result.push(item);
    }
    return result;
  };

  const updateAccounts = async () => {
    setAccounts(await getAccounts());
  };

  const handleBuyEvent = () => {
    onMounted();
  };

  const onMounted = async () => {
    updateAccounts();
    onAccountsChanged(updateAccounts);
    const result = await getItemList();
    setBestSellers(computeBestSellers(result));
  };

  useEffect(() => {
    onMounted();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="bg-white w-full h-screen">
      <ToggleProvider>
        <SelectedProductProvider>
          <Navigation account={account} bestSellers={bestSellers} />
          <section className="flex flex-col items-center mt-[100px]">
            <BestSellers bestSellers={bestSellers} />
          </section>
          <ProductDetail onBuyEvent={handleBuyEvent} />
        </SelectedProductProvider>
      </ToggleProvider>
    </main>
  );
}

export default App;
