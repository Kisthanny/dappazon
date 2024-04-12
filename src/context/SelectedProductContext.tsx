import { createContext, useState, ReactNode, useContext } from "react";
import { DappazonProduct } from "../libs/contract";
interface SelectedProductContextType {
  product: DappazonProduct;
  select: (newProduct: DappazonProduct) => void;
}

export const SelectedProductContext = createContext<
  SelectedProductContextType | undefined
>(undefined);

// 创建一个 Provider，用于包裹整个组件树
export const SelectedProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState({} as DappazonProduct);

  const select = (newProduct: DappazonProduct) => {
    setProduct(newProduct);
  };

  // 将状态值和切换函数提供给子组件
  const value = { product, select };

  return (
    <SelectedProductContext.Provider value={value}>
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error(
      "useSelectedProduct must be used within a SelectedProductProvider"
    );
  }
  return context;
};
