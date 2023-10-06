import { useState } from "react";

import appStyle from "./styles/App.module.css";

import Form from "./components/Form";
import ListingLogic from "./components/ListingLogic";
import Balance from "./components/Balance";

const App = () => {

    //States to save the list and the balance
    const [list, setList] = useState([])
    const [balance, setBalance] = useState(1000)
    const [finalBalance, setFinalBalance] = useState(0)
    //State to save the item to be edited
    const [editItem, setEditItem] = useState({});
    //State to save aplly button status
    const [aply, setAply] = useState(false);
    //State to save edition status
    const [edition, setEdition] = useState(false);

    return (
        <div className={appStyle.font}>

            <div>
                <Balance
                    balance={balance}
                    setBalance={setBalance}
                    
                    finalBalance={finalBalance}
                    setFinalBalance={setFinalBalance}

                    list={list}

                    setAply={setAply}
                    aply={aply}
                />
            </div>

            <div className={appStyle.general}>
                <div>
                    <Form
                        list={list}
                        setList={setList}

                        balance={balance}
                        finalBalance={finalBalance}

                        aply={aply}
                    />
                </div>

                <div>
                    <ListingLogic 
                        list={list}
                        setList={setList}

                        finalBalance={finalBalance}

                        editItem={editItem}
                        setEditItem={setEditItem}

                        edition={edition}
                        setEdition={setEdition}
                    />
                </div>
            </div>
            
        </div>
    );
};

export default App;