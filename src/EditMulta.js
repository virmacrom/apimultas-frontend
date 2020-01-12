import React from 'react';
//import Button from 'react-bootstrap/Button';

function EditMulta(props){
    const handleChange = event => {
        props.onChange({...props.multa, [event.target.name]: event.target.value})
    }
    return(
        <tr> 
            <td>{props.multa.dni}</td>
            <td><input className="form-control" name="concepto" value={props.multa.concepto} onChange={handleChange}/></td>
            <td><input className="form-control" name="puntos" value={props.multa.puntos} onChange={handleChange}/></td>
            <td><input className="form-control" name="importe" value={props.multa.importe} onChange={handleChange}/></td>
            <td>
                <button  className="btn btn-success" onClick={() => props.onSave(props.multa)}>Grabar</button>
                <button  className="btn btn-danger" onClick={() => props.onCancel(props.multa)}>Cancelar</button>
            </td>
            
        </tr>
    )
}

export default EditMulta;