import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import BestSellers from "./pages/BestSellers";
import { getAccounts, onAccountsChanged } from "./libs/wallet";
function App() {
  const [accounts, setAccounts] = useState([""]);
  const account = accounts[0];
  const updateAccounts = async () => {
    setAccounts(await getAccounts());
  };
  const onMounted = async () => {
    updateAccounts();
    onAccountsChanged(updateAccounts);
  };
  useEffect(() => {
    onMounted();
  }, []);

  return (
    <main className="bg-white w-full h-screen">
      <Navigation account={account} />
      <section className="flex flex-col items-center mt-[100px]">
        <BestSellers />
      </section>
    </main>
  );
}

export default App;
