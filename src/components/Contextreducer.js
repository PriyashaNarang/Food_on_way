import { useReducer, createContext, useContext } from "react"
const CardStateContext=createContext();
const CardDispatchContext=createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let emparr=[];
            return emparr;
        case "UPDATE":
            let arr = [...state]
            // console.log(arr)
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: food.qty + parseInt(action.qty), price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};
export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return (
        <CardDispatchContext.Provider value={dispatch}>
            <CardStateContext.Provider value={state}>
                {children}
            </CardStateContext.Provider>
        </CardDispatchContext.Provider>
    )
}
// making these global
export const useCart=()=>useContext(CardStateContext);
export const useDispatch=()=>useContext(CardDispatchContext);