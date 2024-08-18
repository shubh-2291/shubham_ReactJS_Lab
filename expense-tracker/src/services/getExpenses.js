import axios from 'axios'

const getExpenses = async () => {
    const response = await axios.get('http://localhost:3002/items');
    return response.data;
}

const postExpenses = async (newExpense) => {
    const response = await axios.post('http://localhost:3002/items', newExpense, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export {
    getExpenses,
    postExpenses
}