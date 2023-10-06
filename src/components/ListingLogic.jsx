import style from "../styles/Listing.module.css";
import { useState, useEffect } from "react";
import Listing from "./Listing";    

const ListingLogic = ({list, setList, editItem, setEditItem, edition, setEdition, finalBalance}) => {

    //States to validate search input a radio in real time
    const [textInput, setTextInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('all');
    //State to save the list to be displayed
    const [searchList, setSearchList] = useState([]);
    //States to validate the form in real time
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    //State to save the type of the item to be edited
    const [selectedEdition, setSelectedEdition] = useState('');
    
    //Effect to validate if there is an item to be edited
    useEffect(() => {
        setEdition(Object.keys(editItem).length > 0);
        if (Object.keys(editItem).length > 0) {
            setName(editItem.name);
            setValue(editItem.value);
        } else {
            setName('');
            setValue('');
        }
    }, [editItem]);

    //Function to cancel the edition
    const cancelEdit = () => {
        setEditItem({});
        setEdition(false);
    }

    //Function to accept the edition
    const acceptEdit = () => {

        //Create the edited item
        const editedItem = {
            id: editItem.id,
            type: selectedEdition,
            name: name,
            value: value
        }

        //check final balance
        if (parseInt(editedItem.value) > parseInt(finalBalance)+parseInt(editItem.value) && editedItem.type === 'out'){
            alert('No puedes editar este egreso, ya que supera el saldo final.');
        }else{
            //Replace the edited item in the list keeping all the other items
            //if balance is ok
            const newList = list.map((item) => {
                if (item.id === editedItem.id) {
                    return editedItem;
                }
                return item;
            });

            //Set the new list
            setList(newList);

            setEditItem({});
            setEdition(false);
        }

        
    }

    //Function to handle the name to edit as input
    const handleName = (e) => {
        const inputName = e.target.value;
        if (/^[A-Za-z\s]*$/.test(inputName)) {
            setName(inputName);
        }
    };

    //Function to handle the value to edit as input
    const handleValue = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    //Effect Function to filter the list to be displayed as search
    useEffect(() => {
        let filteredList = list;
    
        if(selectedOption === 'in') {
            filteredList = filteredList.filter(item => item.type === 'in');
        } else if(selectedOption === 'out') {
            filteredList = filteredList.filter(item => item.type === 'out');
        }
    
        if(textInput !== '') {
            filteredList = filteredList.filter(item => item.name.toLowerCase().includes(textInput.toLowerCase()));
        }
    
        setSearchList(filteredList);
    }, [textInput, selectedOption, list]);

    //Function to delete an item from the list
    const del = (item) => {
        const itemDel = list.filter((i) => i.id !== item.id);
        setTextInput('');
        setList(itemDel);
    };

    //Function save the item to be edited
    const edit = (item) => {
        const toEdit = list.find((i) => i.id === item.id);
        setEditItem(toEdit);
    };


    return(
        <div className={style.container}>

            <div className="searchContainer">
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Busqueda"
                />

                <label>
                    <input
                    type="radio"
                    value="all"
                    checked={selectedOption === 'all'}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    Todo
                </label>

                <label>
                    <input
                    type="radio"
                    value="in"
                    checked={selectedOption === 'in'}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    Ingreso
                </label>

                <label>
                    <input
                    type="radio"
                    value="out"
                    checked={selectedOption === 'out'}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    Egreso
                </label>

            </div>

            <div className={style.separator}></div>

            <div className={style.title}>Total: {searchList.length}</div>
            {searchList.map((item) => (
                <Listing
                    key={item.id}
                    item={item}
                    del={del}
                    edit={edit}
                />
            ))}

            {edition && (
                <div className={style.overlay}>
                    <div className={style.editItemDiv}>
        
                        <div className="edition">Edición</div>
                        <hr className={style.separator}/>

                        <select 
                            name="select" 
                            id="" 
                            className={style.select}
                            defaultValue={editItem.type}
                            onChange={(e) => setSelectedEdition(e.target.value)}
                            >
                            <option value="out">Egreso</option>
                            <option value="in">Ingreso</option>
                        </select>
                        <br />
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={handleName}
                        />
                        <br />
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Valor"
                            value={value}
                            onChange={handleValue}
                        />
                        <br />


                        <div className="buttonContainer">
                            <button className={style.cancelEdit} onClick={cancelEdit}>Cancelar</button>
                            <button className={style.acceptEdit} onClick={acceptEdit}>Editar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ListingLogic;