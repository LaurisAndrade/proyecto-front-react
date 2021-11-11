import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Url from '../global';
import { render } from '@testing-library/react';

class Libros extends Component {
    //Estados
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            codigo: '',
            titulo: '',
            autor: '',
            edicion: '',
            idioma: '',
            cantidad: '',
            tipoModal: ''
        }
    }
   

    //Listar libros
    peticionGet=()=>{
        axios.get(Url + '/api/libro/listar').then(response=>{
            console.log(response);
            this.setState({data: response.data.libros});
        }).catch(error=>{
            console.log(error.message);
        })
    }

     //Insertar libros
    peticionPost=async()=>{
        //eliminar atributo id, ya que este lo suministra la base de datos
        delete this.state.form.id;
        await axios.post(Url + '/api/libro/crear', this.state.form).then(response=>{
        //Al momento de guardar se debe cerrar el modal
        this.modalInsertar();
        //Petición get para actualizar los datos
        this.peticionGet();
        //Manejo de errores
        
        }).catch(error=>{
            console.log(error.message);
        })
    }

    //Actualizar libros
    peticionPut=()=>{
        console.log("prueba");
        axios.put(Url + '/api/libro/modificar', this.state.form).then(response=>{
        //Al momento de actualizar se debe cerrar el modal
        this.modalInsertar();
         //Petición get para actualizar los datos
         this.peticionGet();
        })
    }

    //Eliminar libros
    peticionDelete=()=>{
        console.log(this.state.form.id)
        axios.delete(Url + '/api/libro/eliminar/'+ this.state.form.id).then(response=>{
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
    seleccionarEmpresa=(libro)=>{
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: libro.id,
                codigo: libro.codigo,
                titulo: libro.titulo,
                autor: libro.autor,
                edicion: libro.edicion,
                idioma: libro.idioma,
                cantidad: libro.cantidad
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
            <div className="Libros">
                <br/>
                <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}} style={{marginLeft:'470px'}}>Agregar Libro</button>
                <br/><br/>
                
                <div className="col-md-6" style={{marginLeft:'450px'}}>
                <h1 align="center" 
                style={{backgroundColor:'#fff'}}>LIBROS</h1>
                <table className=" table table-light table-striped table-bordered table-sm">
                
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Edición</th>
                            <th>Idioma</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(libro=>{
                        return(
                            <tr>
                        
                                <td>{libro.codigo}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.edicion}</td>
                                <td>{libro.idioma}</td>
                                <td>{libro.cantidad}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(libro); this.modalInsertar()}} ><FontAwesomeIcon icon={faEdit}/></button>
                                    {" "}
                                    <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(libro); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
                       
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                <h3 align="center"  >Nuevo Libro</h3>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}></span>
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                            
                            <label htmlFor="id">Codigo</label>
                            <input className="form-control" type="text" name="codigo" id="codigo"  onChange={this.handleChange} value={form?form.codigo: ''}/>
                            <br />
                            <label htmlFor="id">Titulo</label>
                            <input className="form-control" type="text" name="titulo" id="titulo"  onChange={this.handleChange} value={form?form.titulo: ''}/>
                            <br />
                            <label htmlFor="id">Autor</label>
                            <input className="form-control" type="text" name="autor" id="autor"  onChange={this.handleChange} value={form?form.autor: ''}/>
                            <br />
                            <label htmlFor="id">Edición</label>
                            <input className="form-control" type="text" name="edicion" id="edicion"  onChange={this.handleChange} value={form?form.edicion: ''}/>
                            <br />
                            <label htmlFor="id">Idioma</label>
                            <input className="form-control" type="text" name="idioma" id="idioma"  onChange={this.handleChange} value={form?form.idioma: ''}/>
                            <br />
                            <label htmlFor="id">Cantidad</label>
                            <input className="form-control" type="text" name="cantidad" id="cantidad"  onChange={this.handleChange} value={form?form.cantidad: ''}/>
                          
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
                        Estás seguro que deseas eliminar el libro {form && form.titulo}
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
export default Libros;