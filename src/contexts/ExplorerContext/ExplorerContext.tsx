import React, { useContext, useEffect, useState } from "react";
import {
  ExplorerState,
  PaginationParams,
} from "../../reducers/TransfersReducer";
import { fetchTransfers } from "../../services/ExplorerService";

const DEFAULT_PAGINATION_OPTIONS = { first: "10" };

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {
  explorerState: ExplorerState;
  loadMore: (options: PaginationParams) => void;
  setExplorerStateContext: any;
};

const ExplorerContext = React.createContext<ExplorerContext | undefined>(
  undefined
);

const ExplorerProvider = ({ children }: IExplorerContextProps) => {
  const {
    __RUNTIME_CONFIG__: {
      CHAINBRIDGE: { chains },
    },
  } = window;

  const [state, setState] = useState<ExplorerState>({
    isLoading: false,
    transfers: [],
    error: false,
    chains,
  });

  useEffect(() => {
    fetchTransfers(setState, state, DEFAULT_PAGINATION_OPTIONS);
  }, []);

  const loadMore = (options: PaginationParams) =>
    fetchTransfers(setState, state, options);

  return (
    <ExplorerContext.Provider
      value={{
        explorerState: state,
        loadMore,
        setExplorerStateContext: setState,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (context === undefined) {
    throw new Error("useExplorer must be called within a ExplorerProvider");
  }
  return context;
};

export { ExplorerProvider, useExplorer };
