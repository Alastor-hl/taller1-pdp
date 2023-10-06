import { useState, useEffect } from "react";

import style from "../styles/Balance.module.css";

const Balance = ({balance, setBalance, finalBalance, setFinalBalance, list, setAply, aply}) => {

    const [balanceEdit, setBalanceEdit] = useState(true);

    //Function to change first balance
    const changeAply = () => {
        if(!aply){
            setAply(true);
            setBalanceEdit(false);
            setFinalBalance(balance);
        }
    };

    //Function to prevent the user from entering letters
    const handleBalanceNum = (e) => {
        const inputBalance = e.target.value;
        if (/^\d*$/.test(inputBalance)) {
            setBalance(inputBalance);
        }
    };

    //Function to calculate the final balance
    useEffect(() => {
        // Executes when the list changes
        const calculateFinalBalance = () => {
            let total = parseInt(balance ?? '0');

            // Iterate over the list and add or subtract the value
            list.map((item) => {
                if (item.type === 'in') {
                    total += parseInt(item.value);
                } else {
                    total -= parseInt(item.value);
                }
            });

            //Control the final balance
            if (total < 0) {
                return;
            }else{
                setFinalBalance(total);
            }

            
        };

        // Call the function
        calculateFinalBalance();

    }, [list]);




    return(
        <nav className={style.menu}>
            <ul>
                <li className={style.left}>Incial</li>
                <input
                className={style.input}
                type="text"
                placeholder="Saldo Inicial"
                value={balance.toLocaleString()}
                onChange={handleBalanceNum}   
                disabled={!balanceEdit}
                />
                <button className={style.aply} onClick={changeAply}>Aplicar</button>

                <li className={style.right}>Final</li>
                <div className={style.readOnlyInput}>
                    {finalBalance}
                </div>
            </ul>
        </nav>
    );
};

export default Balance;