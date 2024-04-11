export const bestSellers = [
  {
    name: "Clothing & Jewelry",
    hash: "#clothingNjewelry",
    productList: [
      {
        id: 4,
        name: "Shoes",
        category: "clothing",
        image:
          "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg",
        price: "0.25",
        rating: 5,
        stock: 3,
      },
      {
        id: 5,
        name: "Sunglasses",
        category: "clothing",
        image:
          "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/sunglasses.jpg",
        price: "0.10",
        rating: 4,
        stock: 12,
      },
      {
        id: 6,
        name: "Watch",
        category: "clothing",
        image:
          "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/watch.jpg",
        price: "1.25",
        rating: 4,
        stock: 0,
      },
    ],
  },
  {
    name: "Electronics & Gadgets",
    hash: "#electronicsNgadgets",
    productList: [],
  },
  {
    name: "Toys & Gaming",
    hash: "#toysNgaming",
    productList: [],
  },
];
const Navigation = () => {
  return (
    <nav className="fixed w-full top-0 left-0 right-0 z-10">
      <div className="bg-[#131921] flex items-center justify-around py-3 px-8 gap-48">
        <h2 className="text-white font-extrabold font text-3xl">Dappazon</h2>
        <input type="text" className="rounded-sm flex-1" />
        <button className="bg-[#ff9900] px-8 py-1 rounded-sm font-bold">
          Connect
        </button>
      </div>
      <div className="bg-[#232f31] py-2 text-white flex items-center justify-center gap-8">
        {bestSellers.map((title) => (
          <a href={title.hash}>{title.name}</a>
        ))}
      </div>
    </nav>
  );
};
export default Navigation;
