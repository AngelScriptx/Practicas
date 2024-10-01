import { useState } from 'react';
import { AgregarTarea } from './components/agregarTarea/AgregarTarea';
import { Item } from './components/itemTarea/ItemTarea';

function App() {
  const [arraytareas, setTArraytareas] = useState([]);

  const crearTarea = (nuevaTareaObjeto) => {
    setTArraytareas([...arraytareas, nuevaTareaObjeto]);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = arraytareas.filter((tarea) => tarea.id!== id);
    setTArraytareas(nuevasTareas);
  };

  const editarTarea = (id, nuevaTarea) => {
    const nuevasTareas = arraytareas.map((tarea) =>
      tarea.id === id ? nuevaTarea : tarea
    );
    setTArraytareas(nuevasTareas);
  };

  return (
    <>
      <AgregarTarea crearTarea={crearTarea} />
      <hr />
      <Item tareas = {arraytareas} editarTarea = {editarTarea} eliminarTarea = {eliminarTarea}/>
      {console.log(`Data desde App ${JSON.stringify(arraytareas)}`)}
    </>

  );
}

export default App;
