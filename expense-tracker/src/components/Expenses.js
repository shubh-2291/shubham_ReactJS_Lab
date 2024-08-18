import { getExpenses } from "../services/getExpenses";
import AddExpenses from './AddExpense';
import { useCallback, useEffect, useState } from "react";

function Expenses() {

    // console.log("Expense render");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);
    const [rahulExpense, setRahulExpense] = useState(0);
    const [rameshExpense, setRameshExpense] = useState(0);
    const [payeeName, setPayeeName] = useState("");
    const [payToPayee, setPayToPayee] = useState(0);

    const closeForm = useCallback(() => {
        setShowForm(false);
    }, []);


    const calculateExpenses = useCallback(() => {
        const total = expenses.reduce((sum, item) => sum + item.price, 0);
        setTotalExpense(total);

        const rahulTotal = expenses.filter(item => item.payeeName === 'Rahul').reduce((sum, item) => sum + item.price, 0);
        setRahulExpense(rahulTotal);

        let rameshTotal = total - rahulTotal;
        setRameshExpense(rameshTotal);

        let payeeName = "";
        let needToPay = 0;
        if (rahulTotal > rameshTotal) {
            payeeName = "Ramesh";
            needToPay = rahulTotal - rameshTotal
        } else if (rahulTotal === rameshTotal) {
            payeeName = "";
            needToPay = 0;
        } else {
            payeeName = "Rahul";
            needToPay = rameshTotal - rahulTotal;
        }

        setPayeeName(payeeName);
        setPayToPayee(needToPay);
    }, [expenses]);


    useEffect(() => {
        const helper = async () => {

            try {
                const expenses = await getExpenses();
                setExpenses(expenses);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.log(error.message);
            }
        }
        helper();
    }, [showForm]);

    useEffect(() => {
        if (expenses.length > 0) {
            calculateExpenses();
        }
    }, [expenses]);

    return (
        <>
            {
                loading && error === null && (
                    <div className="loading">Loading...</div>
                )
            }
            {
                loading === false && error === null && (
                    <div className="container">
                        <header>
                            <h1>Expense Tracker</h1>
                        </header>
                        <hr />
                        <article>
                            <table className="table-data">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Product Purchased</th>
                                        <th>Price</th>
                                        <th>Payee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        expenses.map((e, idx) => (
                                            <tr key={idx}>
                                                <td>{e.setDate}</td>
                                                <td>{e.product}</td>
                                                <td>{e.price}</td>
                                                <td>{e.payeeName}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
                            <hr />
                            <div className="flex-container">
                                <div className="flex-item-1">Total:</div>
                                <div className="flex-item-2">{totalExpense}</div>
                            </div>
                            <div className="flex-container">
                                <div className="flex-item-1">Rahul Paid :</div>
                                <div className="flex-item-2">{rahulExpense}</div>
                            </div>
                            <div className="flex-container">
                                <div className="flex-item-1">Ramsesh Paid :</div>
                                <div className="flex-item-2">{rameshExpense}</div>
                            </div>
                            <div className="flex-container-last">
                                <div className="flex-item-1">Pay {payeeName}:</div>
                                <div className="flex-item-2">{payToPayee}</div>
                            </div>
                        </article>
                        {
                            showForm && (
                                <div className="form">
                                    <AddExpenses closeForm={closeForm} />
                                </div>
                            )
                        }
                    </div >
                )
            }
            {
                error !== null && loading === false && (
                    <div className="error">Error : {error}</div>
                )
            }
        </>



    )
};

export default Expenses;