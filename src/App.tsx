import Navigation from "./components/Navigation";
import BestSellers from "./pages/BestSellers";
function App() {
  return (
    <div className="bg-white w-full h-screen">
      <header></header>
      <body className="relative">
        <Navigation />
        <section className="flex flex-col items-center mt-[100px]">
          <BestSellers />
        </section>
      </body>
    </div>
  );
}

export default App;
