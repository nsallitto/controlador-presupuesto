import { useEffect, useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from './components/ListadoGastos';
import { object } from 'prop-types';
import Filtros from './components/Filtros';



function App() {

  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem("presupuesto")) ?? 0 );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  //VENTANA MODAL
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [] );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect( () => {
    if ( Object.keys(gastoEditar).length > 0 ) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 400);
    }
  },[gastoEditar])

  useEffect( () => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto] )

  useEffect( () => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  },[gastos] )

  useEffect( () => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro] )

  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
      
    }
    
  },[] )

  //BOTON NUEVO GASTO
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 400);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //ACTUALIZANDO GASTO
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //NUEVO GASTO
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 400);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !==id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt='nuevo-gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      { modal && <Modal
                     setModal={setModal}
                     animarModal={animarModal}
                     setAnimarModal={setAnimarModal}
                     guardarGasto={guardarGasto}
                     gastoEditar={gastoEditar}
                     setGastoEditar={setGastoEditar}
                 /> }

    </div>
  )
}

export default App
