import style from "../styles/Listing.module.css";

const Listing = ({item, del, edit}) =>{
    return(
        <li className={style.list}>
            <button className={style.action} onClick={()=>{del(item)}}>Borrar</button>
            <button className={style.action} onClick={()=>{edit(item)}}>Editar</button>
            <div className={item.type === 'in' ? style.typeIn : style.typeOut}>{item.name}</div>
            <div className={style.value}>{item.value}</div>
        </li>
    );
};

export default Listing;