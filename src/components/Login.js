
import React, {Component} from 'react';
import {Button , Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Login extends Component {
    constructor() {
        //Heredar toda la funcionalidad que trae el componente de react
        super();
        //Estado del componente
        this.state = {
          usuario:'',
          contraseña:'',
       
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
            <Button onClick={this.abrirModal}
             style={{    
                width:'216px',
                backgroundColor: '#060b26',
                height: '82px',
                display:'scroll',
                position:'fixed',
                bottom:'740px',
                right:'205px'
                
            }}
            >Login</Button>

            <div className=" p-4 ">
            <Modal 
             isOpen={this.state.abierto}
             style={{    
                 width:'350px',
                 font:'caption',
                 backgroundColor: '#C39BD3'
             }}
             >
                <ModalHeader>
                   <h3
                     style={{
                        fontSize:'30px',
                        textAlign:'center',
                        marginLeft:'110px',
                        font:'oblique bold 120% cursive'
                       
                    }}
                   >LOGIN</h3> 
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label for="codigo">Usuario</label>
                        <input type="text" name="usuario" className="form-control" placeholder="Usuario"  />
                    </FormGroup>
                    <FormGroup >
                        <label for="codigo">Contraseña</label>
                        <input type="text" name="contraseña" className="form-control" placeholder="Contraseña"  />
                    </FormGroup>
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                      style={{
                        
                        marginRight:'90px'
                       
                    }}
                    >Iniciar sección</Button>
                    
                </ModalFooter>
            </Modal>
            </div>
           </>
        )
       
    }
}
  
  
    
  
export default Login;