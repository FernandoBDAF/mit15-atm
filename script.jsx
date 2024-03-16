const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  return (
    <label className="label huge">
      {atmMode !== "" && (
        <input
          id="number-input"
          type="number"
          width="200"
          onChange={onChange}
        ></input>
      )}
      {atmMode !== "" && (
        <input
          disabled={!isValid}
          type="submit"
          width="200"
          value="Submit"
          id="submit-input"
        ></input>
      )}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(true);
  const [transaction, setTransaction] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (event.target.value < 0) {
      setValidTransaction(false);
      return;
    }
    if (!isDeposit && event.target.value > totalState) {
      setValidTransaction(false);
      return;
    }
    setValidTransaction(true);
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
    if (!isDeposit && deposit > newTotal) {
      setValidTransaction(false);
    }
    const newTransaction = {
      date: new Date().toLocaleString(),
      description: atmMode,
      amount: deposit,
    };
    setTransaction([...transaction, newTransaction]);
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    if (e.target.value) {
      e.target.value == "Deposit" ? setIsDeposit(true) : setIsDeposit(false);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an operation to continue</label>
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        <br/>
        <ATMDeposit
          isValid={validTransaction}
          atmMode={atmMode}
          onChange={handleChange}
          isDeposit={isDeposit}
        ></ATMDeposit>
      </form>
      <TransactionHistory transactions={transaction} />
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
