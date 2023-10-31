import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) {

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState("")
    const [fecha, setFecha] = useState("")


    const [mensaje, setMensaje] = useState("");

    useEffect( () => {
        if ( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[])

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);
        }, 400);
    }
    //VALIDACION FORMULARIO
    const handleSubmit = (e) => {
        e.preventDefault();

        if ( [nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 3000);
            
            return
        }
        //GUARDAMOS GASTO DESPUES DE VALIDAR
        guardarGasto({nombre, cantidad, categoria, id, fecha})
   
    }



  
    return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal} 
            />
        </div>
        <form 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    type="text" 
                    placeholder="Añade el nombre del gasto"
                    id="nombre"
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value) }
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type="number" 
                    placeholder="Añade la cantidad ej: 300"
                    id="cantidad"
                    value={cantidad}
                    onChange={ (e) => setCantidad(Number(e.target.value)) }
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">categoria</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={ (e) => setCategoria(e.target.value) }
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
            />
        </form>
    </div>
  )
}

export default Modal