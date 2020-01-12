import React from 'react';
import Multa from './Multa.js';
import NewMulta from './NewMulta.js';
import EditMulta from './EditMulta.js';
import Alert from './Alert.js';
//import MultasApi from './MultasApi';

class Multas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            multas: [], // this.props.multas,
            isEditing: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addMulta = this.addMulta.bind(this);

    }

    componentDidMount() {
      //  MultasApi.getAllMultas()
         //   .then(
           //     (result) => {
                    this.setState({
                     //   multas: result
                    })
           //     },
              //  (error) => {
                    this.setState({
                        errorInfo: "Problemas con la conexion al servidor"
                    })
            //    }          
          //  )
    }
    
    handleEdit(multa, _id){
      //  MultasApi.updateMulta(multa,_id);
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
      //  MultasApi.deleteMulta(multa,_id);

            this.setState(prevState => ({
                multas: prevState.multas.filter((c) => c._id !== multa._id)
            }))         
    }

    handleChange(_id, multa){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [_id]: multa}
        }))
    }

    handleSave(_id, multa){
      //  MultasApi.updateMulta(multa,_id);
        this.setState(prevState =>{
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[_id];

            if (_id===multa._id){
                const multas = prevState.multas;
                const pos = multas.findIndex(c => c._id === multa._id);
                return {
                    multas: [...multas.slice(0,pos), Object.assign({}, multa), ...multas.slice(pos+1)],
                    isEditing: isEditing
                }
            }
 
            return{
                errorInfo: "Cannot edit id",
            }
        });
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    addMulta(multa,dni,concepto,puntos,importe) {
      //  MultasApi.addMulta(multa,dni,concepto,puntos,importe).then(
            this.setState(prevState => {
                const multas = prevState.multas;
                if (!multas.find(c => c.dni === multas.dni)){
                    return({
                        multas: [...prevState.multas, multa]
                    });
                }
                return({
                    errorInfo: ' El usuario ya existe'
                });
            })
      //  )
    }

    render(){
        return(
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
             <table className="table">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Concepto</th>
                        <th>Puntos restados</th>
                        <th>Importe</th>
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
            </div>
        );
    }
}



export default Multas;