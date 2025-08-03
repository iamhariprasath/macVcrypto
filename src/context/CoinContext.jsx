import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

  const API_KEY = 'CG-Sra6VNLQk8i4TtFatuR3vg58';

  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  // ✅ Add wishlist state
  const [wishlist, setWishlist] = useState([]);

  // ✅ Add toggle function for wishlist
  const toggleWishlist = (coinId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(coinId)
        ? prevWishlist.filter(id => id !== coinId)
        : [...prevWishlist, coinId]
    );
  };

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(response => response.json())
      .then(response => setAllCoin(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    API_KEY,
    wishlist,        // ✅ added
    toggleWishlist   // ✅ added
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
