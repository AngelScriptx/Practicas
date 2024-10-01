/* eslint-disable react/prop-types */
import { useState } from 'react';
import estilo from './agregarTarea.module.css';

export function AgregarTarea({ crearTarea }) {
  const [titulo, setTitulo] = useState("");
  const [text, setText] = useState("");

  const resetearTexto = () => {
    setTitulo('');
    setText('');
  };

  function manejarAgregar(){
    const nuevaTarea = {
      id: Date.now(), 
      titulo: titulo ,
      descripcion: text
    };
    crearTarea(nuevaTarea);
    resetearTexto();
  };

  return (
    <>
      <div className={estilo.bgBlu}>
        <b>Título de tarea</b>
        <input
          type="text" 
          placeholder="Escribir título de tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <b>Descripción de tarea</b>
        <textarea
          placeholder="Escribir descripción de tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={manejarAgregar}>Agregar</button>
      </div>
    </>
  );
}
