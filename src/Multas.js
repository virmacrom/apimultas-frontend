import React from 'react';
import Multa from './Multa.js';
import NewMulta from './NewMulta.js';
import EditMulta from './EditMulta.js';
import Alert from './Alert.js';
import MultasApi from './MultasApi';
import PuntosApi from './PuntosApi';
import BuscarRegistro from './BuscarRegistro.js';

class Multas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            multas: [], // this.props.multas,
            multasBackup: [],
            isEditing: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handdleSearch= this.handdleSearch.bind(this);
        this.handleShowAll=this.handleShowAll.bind(this);
        this.addMulta = this.addMulta.bind(this);

    }

    handleShowAll(){
        this.setState({
            multas: this.state.multasBackup
        });
    }

    handdleSearch(dni){
       // const multas=this.state.multas;
        const multasBackup=this.state.multasBackup;

        if(dni===''){
            this.setState(prevState=>({
                errorInfo:"Introduzca un DNI",
                multas:this.state.multasBackup
            }))
        }

        else if(!multasBackup.find(c=>c.dni === dni)){
            this.setState(prevState=>({
                errorInfo:"No existe carnet con el DNI: "+dni,
                multas:this.state.multasBackup
            }))
        }

        else{
            this.setState(prevState=>({  
                multas: prevState.multasBackup.filter((c)=>c.dni === dni)                            
            }))  
        }
    }  

    componentDidMount() {
        MultasApi.getAllMultas()
            .then(
                (result) => {
                    this.setState({
                        multas: result,
                        multasBackup:result
                    })
                },
                (error) => {
                    this.setState({
                        errorInfo: "Problemas con la conexion al servidor"
                    })
                }          
           )
   }
    
    handleEdit(multa, _id){
        MultasApi.updateMulta(multa,_id);
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [multa._id]: multa}
        }));
    }

    handleCancel(_id, multa){
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleDelete(multa,_id){
        MultasApi.deleteMulta(multa,_id);

            this.setState(prevState => ({
                multas: prevState.multas.filter((c)=>c._id!== multa._id),
                multasBackup: prevState.multas.filter((c)=>c._id!== multa._id),
                errorInfo: "Registro eliminado correctamente"
            }))         
    }

    handleChange(_id, multa){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [_id]: multa}
         
        }))
    }

    handleSave(_id, multa){

        if(multa.dni!==""){

            if(!this.comprobarDNI(multa.dni)){

                this.setState({
                    errorInfo:"Formato de DNI no válido"
                })

            }else if(this.comprobarDNI(multa.dni)){
                MultasApi.updateMulta(multa,_id);
                this.setState(prevState =>{
                    const isEditing = Object.assign({}, prevState.isEditing);
                    delete isEditing[_id];

                    if (_id===multa._id){
                        const multas = prevState.multas;
                        const pos = multas.findIndex(c => c._id === multa._id);
                        return {
                            multas: [...multas.slice(0,pos), Object.assign({}, multa), ...multas.slice(pos+1)],
                            errorInfo: "Registro modificado correctamente",
                            isEditing: isEditing
                        }
                    }
        
                    return{
                        errorInfo: "No se puede editar el registro",
                    }
                });
            }
        }else{
            this.setState({
                errorInfo:"El campo DNI no puede estar vacío"
            })

        }
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    comprobarDNI(dni) {
        var numero
        var letr
        var letra
        var expresion_regular_dni
       
        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
       
        if(expresion_regular_dni.test (dni) === true){
           numero = dni.substr(0,dni.length-1);
           letr = dni.substr(dni.length-1,1);
           numero = numero % 23;
           letra='TRWAGMYFPDXBNJZSQVHLCKET';
           letra=letra.substring(numero,numero+1);
          if (letra!==letr.toUpperCase()) {
            return true;
           }
        }else{
            
           return false;
         }    
    
    }

    addMulta(multa,dni,concepto,puntos,importe) {

        if(dni!=="" && concepto !=="" && puntos!=="" && importe!==""){

            if(!this.comprobarDNI(dni)){

                this.setState({
                    errorInfo:"Formato de DNI no válido"
                })

            }else if(this.comprobarDNI(dni)){
                let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");

            if (!regex.test(concepto)) {
           
                this.setState({
                    errorInfo:"El concepto solo debe contener letras"
                })
                return;
            }


            MultasApi.addMulta(multa,dni,concepto,puntos,importe).then(
                this.setState(prevState => {
                    const multas = prevState.multas;
                    if (!multas.find(c => c.dni === multas.dni)){
                        return({
                            multas: [...prevState.multas, multa],
                            errorInfo: "Registro añadido correctamente"
                        });
                    }
                    return({
                        errorInfo: ' El usuario ya existe'
                    });
                })
            )
            PuntosApi.restarPuntos(dni,puntos);
            }

        }else{

            this.setState({
                errorInfo:"Los campos no pueden estar vacío"

            })
        } 
    
    }

    render(){
        return(
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                <br/>
                <div>
                    <BuscarRegistro onAddDNI={this.handdleSearch} showAll={this.handleShowAll}></BuscarRegistro><br></br>
                </div>
             <br/>
             <br/>
             <table id="dtBasicExample" className="table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                    <tr align="center">
                        <th>DNI</th>
                        <th>Concepto</th>
                        <th>Puntos restados</th>
                        <th>Importe</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <NewMulta onAddMulta={this.addMulta}/>
                {this.state.multas.map((multa) =>
                    ! this.state.isEditing[multa._id] ?
                    <Multa key={multa._id} multa={multa} 
                        onEdit={this.handleEdit}
                        onDelete={this.handleDelete}/>
                    :
                    <EditMulta key={multa._id} multa={this.state.isEditing[multa._id]} 
                        onCancel={this.handleCancel.bind(this, multa._id)}
                        onChange={this.handleChange.bind(this, multa._id)}
                        onSave={this.handleSave.bind(this, multa._id)} />
                )}   
            </tbody>
            </table>
            <br/>
            <br/>
            </div>
        );
    }

}



export default Multas;