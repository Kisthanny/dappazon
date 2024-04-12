import { createContext, useState, ReactNode, useContext } from "react";
interface ToggleContextType {
  toggleValue: boolean;
  toggle: () => void;
}

export const ToggleContext = createContext<ToggleContextType | undefined>(
  undefined
);

// 创建一个 Provider，用于包裹整个组件树
export const ToggleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toggleValue, setToggleValue] = useState(false);

  const toggle = () => {
    setToggleValue((prevValue) => !prevValue);
  };

  // 将状态值和切换函数提供给子组件
  const value = { toggleValue, toggle };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};
