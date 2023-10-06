import style from '../styles/Form.module.css'
import { useState, useEffect } from "react";
import uuid4 from 'uuid4'

const Form = ({list, setList, balance, finalBalance, aply}) => {

    //States to validate the form in real time
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    //states to show the success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);

    //Function to handle the name input
    const handleName = (e) => {
        const inputName = e.target.value;
        if (/^[A-Za-z\s]*$/.test(inputName)) {
            setName(inputName);
        }
    };

    //Function to handle the value input
    const handleValue = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    //Function to handle the form submission and add the new item to the list
    const handler = (e) => {
        e.preventDefault();

        //check balance
        if (!balance){
            alert('Por favor ingresa un saldo inicial.');
            return;
        }

        //check aply
        if(!aply){
            alert('Por favor aplica el saldo inicial.');
            return;
        }

        //Create the new item
        const newItem = {
            id: uuid4(),
            type: e.target[0].value,
            name: name,
            value: value
        };

        //check empty fields
        if (newItem.name === '' || newItem.value === '') {
            alert('Por favor completa todos los campos.');
            return;
        }

        //check final balance
        if (parseInt(newItem.value) > parseInt(finalBalance) && newItem.type === 'out'){
            setShowFailMessage(true);
        }else{
            setShowSuccessMessage(true);
            setList([...list, newItem]);
        }

        //clean the form
        setName('');
        setValue('');

        //Timeout to hide the messages 
        setTimeout(() => {
            setShowSuccessMessage(false);
            setShowFailMessage(false);
        }, 2500);

        
    };

    return(
        <form onSubmit={handler} className={style.container}>

            <h3>Registros</h3>

            <div className={style.separator}></div>

            <select name="select" id="" className={style.select}>
                <option value="out">Egreso</option>
                <option value="in">Ingreso</option>
            </select>
            <br />
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={handleName}
            />
            <br />
            <input
                type="text"
                placeholder="Valor"
                value={value}
                onChange={handleValue}
            />
            <br />
            <button type="submit" className={style.submit}>Agregar</button>

            <div>
                {showSuccessMessage && <div className={style.succesMessage}>Exito.<br/> El registro ha sido añadido</div>}
                {showFailMessage && <div className={style.failMessage}>Error.<br/> No tienes suficiente saldo.</div>}
            </div>
            
        </form>
    );
};

export default Form;