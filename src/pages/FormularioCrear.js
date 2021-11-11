import React, {Component} from 'react';
import {Button , Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class FormularioCrear extends Component {
    constructor() {
        //Heredar toda la funcionalidad que trae el componente de react
        super();
        //Estado del componente
        this.state = {
          codigo:'',
          titulo:'',
          autor:'',
          edicion:'',
          idioma:'',
          cantidad:'',
          genero:''
        };
    }

    state={
        abierto: false,
    }
    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
     }
  
    render(){
        return(
            <>
            <Button onClick={this.abrirModal}>Libro</Button>

            <Modal isOpen={this.state.abierto}
            style={{
                
                width:'350px',
                font:'caption',
                

                
            }}
            >
                <ModalHeader>
                <h3
                    style={{
                        fontSize:'30px',
                        marginLeft:'80px',
                        font:'oblique bold 120% cursive'
                    
                    }}
                >NUEVO LIBRO</h3> 
                </ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <label for="codigo">codigo</label>
                        <input type="text" name="codigo" className="form-control" placeholder="Codigo"  />
                    </FormGroup>
                    <FormGroup >
                        <label for="codigo">Titulo</label>
                        <input type="text" name="titulo" className="form-control" placeholder="Titulo"  />
                    </FormGroup>
                    <FormGroup>
                        <label for="codigo">Autor</label>
                        <input type="text" name="autor" className="form-control" placeholder="Autor"  />
                    </FormGroup>
                    
                    <FormGroup>
                        <label for="codigo">Idioma</label>
                        <input type="text" name="idioma" className="form-control" placeholder="Idioma"  />
                    </FormGroup>
                   
                    <FormGroup>
                        <label for="codigo">Genero</label>
                        <input type="text" name="genero" className="form-control" placeholder="Genero"  />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Guardar</Button>
                    <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                </ModalFooter>
            </Modal>
          
           </>
        )
       
    }
}
  

  
export default FormularioCrear;
