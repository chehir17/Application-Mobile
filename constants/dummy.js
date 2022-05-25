export const portfolio = {
    balance: "12,724.33",
    changes: "+2.36%",
};

export const trendingCurrencies = [
    {
        id: 1,
        currency: "Totale Action",
        code: "TA",
        image: require("../assets/images/bitcoin.png"),
        amount: "35",
        changes: "7.24%",
        type: "I",      // I - Increased, D - Decreased
    },
    {
        id: 2,
        currency: "Action Termine",
        code: "AD",
        image: require("../assets/images/ethereum.png"),
        amount: "20",
        changes: "47.73%",
        type: "I",
    },
    {
        id: 3,
        currency: "Action Retard",
        code: "AT",
        image: require("../assets/images/litecoin.png"),
        amount: "10",
        changes: "-1.73%",
        type: "D",

    },
    {
        id: 4,
        currency: "Action Cloturé",
        code: "AC",
        image: require("../assets/images/ripple.png"),
        amount: "5",
        changes: "-0.51%",
        type: "D",
    },
]

const dummyData = { portfolio, trendingCurrencies };

export default dummyData;