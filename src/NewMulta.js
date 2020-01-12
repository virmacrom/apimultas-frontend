import React from 'react';
//import Button from 'react-bootstrap/Button';

class NewMulta extends React.Component {
    constructor(props){
        super(props);
        this.state = {dni: '', concepto: '', puntos: '', importe: ''};
        this.changeMulta = this.changeMulta.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeMulta(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    
    clickAdd(){
      let dni=document.getElementById('dni').value;
      let concepto=document.getElementById('concepto').value;
      let puntos=document.getElementById('puntos').value;
      let importe=document.getElementById('importe').value;

      this.props.onAddMulta(this.state,dni,concepto,puntos,importe);
      this.setState({
        dni: '', concepto: '', puntos: '', importe: ''
      });  
      document.getElementById('dni').value=""
      document.getElementById('concepto').value=""
      document.getElementById('puntos').value=""
      document.getElementById('importe').value=""

    }

    render(){
        return(
            <tr>
                <td><input className="form-control" id="dni" name="dni" value={this.state.dni} onChange={this.changeMulta}/></td>
                <td><input className="form-control" id="concepto" name="concepto" value={this.state.concepto} onChange={this.changeMulta}/></td>
                <td><input className="form-control" id="puntos" name="puntos" value={this.state.puntos} onChange={this.changeMulta}/></td>
                <td><input className="form-control" id="importe" name="importe" value={this.state.importe} onChange={this.changeMulta}/></td>
                <td><button className="btn btn-primary" onClick={this.clickAdd}>Añadir multa</button></td>
            </tr>
            
        );
    }
}

export default NewMulta;