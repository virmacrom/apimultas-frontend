import React from 'react'

class BuscarRegistro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dni:''
        };
        this.changeDNI=this.changeDNI.bind(this);
        this.clickAdd=this.clickAdd.bind(this);
    }

    changeDNI(event){
        const dni = event.target.name;
        const value= event.target.value;
        this.setState({
            [dni]:value
        });  
    }

    clickAdd(){
        this.props.onAddDNI(this.state.dni);
        this.setState({
            dni:''
        });  
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="Buscar DNI..." className="forms-control" name="dni" value={this.state.dni} onChange={this.changeDNI}/> <button onClick={this.clickAdd} className="btn btn-primary">Buscar</button> <button onClick={()=>this.props.showAll()} className="btn btn-primary">Mostrar todos</button>       
            </div>
        );
    }
}

export default BuscarRegistro;