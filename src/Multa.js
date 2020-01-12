import React from 'react';

function Multa(props){
    return(
    <tr>
        <td>{props.multa.dni}</td>
        <td>{props.multa.concepto}</td>
        <td>{props.multa.puntos}</td>
        <td>{props.multa.importe}</td>
        <td>
            <button className="btn btn-danger" onClick={() => props.onDelete(props.multa)}>Eliminar multa</button>
        </td>
        <td> 
            <button className="btn btn-primary" onClick={() => props.onEdit(props.multa)}>Modificar multa</button>
        </td>
    </tr>
    );
}

export default Multa;