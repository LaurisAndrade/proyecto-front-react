import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Url from '../global';
import { render } from '@testing-library/react';

class Genero extends Component {
    //Estados
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id:'',
            codigo: '',
            nombre: '',
            tipoModal: ''
        }
    }
   

    //Listar generos
    peticionGet=()=>{
        axios.get(Url + '/api/genero/listar').then(response=>{
            console.log(response);
            this.setState({data: response.data.generos});
        }).catch(error=>{
            console.log(error.message);
        })
    }

     //Insertar generos
    peticionPost=async()=>{
        //eliminar atributo id, ya que este lo suministra la base de datos
        delete this.state.form.id;
        await axios.post(Url + '/api/genero/crear', this.state.form).then(response=>{
        //Al momento de guardar se debe cerrar el modal
        this.modalInsertar();
        //Petición get para actualizar los datos
        this.peticionGet();
        //Manejo de errores
        
        }).catch(error=>{
            console.log(error.message);
        })
    }

    //Actualizar generos
    peticionPut=()=>{
        console.log("prueba");
        axios.put(Url + '/api/genero/modificar', this.state.form).then(response=>{
        //Al momento de actualizar se debe cerrar el modal
        this.modalInsertar();
         //Petición get para actualizar los datos
         this.peticionGet();
        })
    }

    //Eliminar generos
    peticionDelete=()=>{
        console.log(this.state.form.id)
        axios.delete(Url + '/api/genero/eliminar/'+ this.state.form.id).then(response=>{
        //Cerrar modal
        this.setState({modalEliminar: false});
        //Petición get para actualizar los datos
        this.peticionGet();
        })
    }

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
        
    }

    //Para modificar primero se debe capturar la empresa seleccionada
    seleccionarEmpresa=(genero)=>{
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: genero.id,
                codigo: genero.codigo,
                nombre: genero.nombre
            }
        })
    }

    //funcion
    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                //heredar todos los atributos que existan en el form
                ...this.state.form,
                //de acuerdo al nombre del input asi mismo lo guardara en el estado
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }
  
    render(){
        const {form}=this.state;
        return(
            <div className="Genero">
                <br/>
                <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}} style={{marginLeft:'470px'}}>Agregar Genero</button>
                <br/><br/>
                
                <div className="col-md-6" style={{marginLeft:'450px'}}>
                <h1 align="center" 
                style={{backgroundColor:'#fff'}}>GENEROS</h1>
                <table className=" table table-light table-striped table-bordered table-sm">
                
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre completo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(genero=>{
                        return(
                            <tr>
                        <td>{genero.codigo}</td>
                        <td>{genero.nombre}</td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(genero); this.modalInsertar()}} ><FontAwesomeIcon icon={faEdit}/></button>
                            {" "}
                            <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(genero); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                       
                        </tr>
                        )
                        })}
                    </tbody>
                </table>
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                <h3 align="center"  >Nuevo Genero</h3>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}></span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">Código</label>
                            <input className="form-control" type="text" name="codigo" id="codigo"  onChange={this.handleChange} value={form?form.codigo: ''}/>
                            <br />
                            <label htmlFor="id">Nombre completo</label>
                            <input className="form-control" type="text" name="nombre" id="nombre"  onChange={this.handleChange} value={form?form.nombre: ''}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>Insertar</button>:
                            <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Actualizar</button>
                        }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={this.state.modalEliminar}>
              
                    <ModalBody>
                        Estás seguro que deseas eliminar el genero {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Si</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    
    }
}
export default Genero;