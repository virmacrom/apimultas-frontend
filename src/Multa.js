import React from 'react';

function Multa(props){
    return(
    <tr align="center">
        <td>{props.multa.dni}</td>
        <td>{props.multa.concepto}</td>
        <td>{props.multa.puntos}</td>
        <td>{props.multa.importe}</td>
        <td align="center">
            <button className="btn btn-danger" onClick={() => props.onDelete(props.multa)}>Eliminar</button>
        </td>
        <td align="center"> 
            <button className="btn btn-primary" onClick={() => props.onEdit(props.multa)}>Modificar</button>
        </td>
    </tr>
    );
}

export default Multa;