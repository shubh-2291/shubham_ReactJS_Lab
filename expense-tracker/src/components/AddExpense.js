import { useState } from "react";
import { postExpenses } from "../services/getExpenses";
import { useLocation, useNavigate } from "react-router-dom";

function AddExpense(props) {
    const [payeeName, setPayeeName] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [billDate, setBillDate] = useState("");
    const [responseState, setResponseState] = useState('initial' | 'success' | 'error')

    const handlePayeeNameChange = (event) => {
        setPayeeName(event.target.value);
    }

    const handleProductChange = (event) => {
        setProduct(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handledateChange = (event) => {
        setBillDate(event.target.value);
    }

    const addNewExepnse = async (event) => {
        event.preventDefault();
        const newExpense = {
            payeeName,
            product,
            price: parseInt(price),
            setDate: billDate
        }
        try {
            setResponseState('initial')
            await postExpenses(newExpense);
            // console.log(data);
            setResponseState('success')
        } catch (error) {
            responseState('error')
        }
    }

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const closeHandle = () => {
        if (pathname === "/add") {
            navigate("/")
        } else {
            props.closeForm();
        }
    }


    return (
        <section>
            <header>
                <h1>Add New Item</h1>
                <p>Read the below instruction before proceeding:
                    <br></br> Make sure you fill all the fields where * is provided
                </p>
            </header>
            <form onSubmit={addNewExepnse}>
                <article>
                    <p>Name</p>
                    <select required value={payeeName} onChange={handlePayeeNameChange}>
                        <option value="">choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>

                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={product} onChange={handleProductChange}></input>
                </article>
                <article>
                    <p>Price</p>
                    <input type="text" required value={price} onChange={handlePriceChange}></input>
                </article>
                <article>
                    <p>Date</p>
                    <input type="date" required value={billDate} onChange={handledateChange}></input>
                </article>
                <button className="form-button" onClick={() => closeHandle()}>Close</button>
                <input type="submit" className="form-button" ></input>
            </form>
            {
                responseState === 'success' && (
                    alert("Added Successfully!")
                )
            }
            {
                responseState === 'error' && (
                    alert("some error occuring!")
                )
            }
        </section>

    );
}

export default AddExpense;
