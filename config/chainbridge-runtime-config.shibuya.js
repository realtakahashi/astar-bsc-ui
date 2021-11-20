window.__RUNTIME_CONFIG__ = {
  INDEXER__URL: "http://localhost:8000",
  CHAINBRIDGE: {
    chains: [
      {
        chainId: 1,
        networkId: 81,
        name: "Shibuya",
        decimals: 18,
        bridgeAddress: "0x43f1A8D8AA49a893d73C7da8a64d11Fa3A201805",
        erc20HandlerAddress: "0xaE233e91b6DCeD7a2f67Fab6d43Ae7614B757AA7",
        rpcUrl: "https://rpc.shibuya.astar.network:8545",
        type: "Ethereum",
        nativeTokenSymbol: "SBY",
        tokens: [
          {
            address: "0xDE35705D679dF73474E7926F39c3387Db15Be8A9",
            name: "cUSD",
            symbol: "ERC20",
            imageUri: "ETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
        ],
      },
      {
        chainId: 0,
        networkId: 97,
        name: "BSC Testnet",
        decimals: 18,
        bridgeAddress: "0x8AF37079a3D8058f0af3FEF8bf01081aA5419ab3",
        erc20HandlerAddress: "0x839DfDF04a88520d6c7139114330114e58A7e2Da",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        type: "Ethereum",
        nativeTokenSymbol: "BNB",
        tokens: [
          {
            address: "0x78eaF400026A68D000248208baF39B29d788c7da",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
          },
        ],
      },
    ],
  },
};
