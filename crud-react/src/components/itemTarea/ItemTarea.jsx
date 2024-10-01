/* eslint-disable react/prop-types */
import estilo from "./item.module.css";
import { useState } from "react";

export function Item({ tareas, editarTarea, eliminarTarea }) {

  const [tareaEditada, setTareaEditada] = useState({});


  const manejarCambio = (id, campo, valor) => {
    setTareaEditada(
      (prev) => ({
      ...prev,           // Copia todos los valores anteriores del estado
      [id]: {            // Actualiza la tarea con el id específico
        ...prev[id],     // Copia los valores actuales de esa tarea (si ya existían)
        [campo]: valor   // Actualiza solo el campo específico (titulo o descripcion) con el nuevo valor
      }
    })
  );
};
  

  if (tareas.length === 0) {
    return <p>No hay tareas</p>;
  } else {
    return (
      <>
        {tareas.map((tarea) => (
          <div className={estilo.item} key={tarea.id}>
            <input
              placeholder={tarea.titulo}
              value={tareaEditada[tarea.id]?.titulo} 
              onChange={(e) => manejarCambio(tarea.id, 'titulo', e.target.value)}
            />
            <textarea
              placeholder={tarea.descripcion}
              value={tareaEditada[tarea.id]?.descripcion}
              onChange={(e) => manejarCambio(tarea.id, 'descripcion', e.target.value)}
            />
            <div>
              <button
                className={estilo.bgGreen}
                onClick={() => {
                  editarTarea(tarea.id, {
                    id: tarea.id,
                    titulo: tareaEditada[tarea.id]?.titulo || tarea.titulo,
                    descripcion: tareaEditada[tarea.id]?.descripcion || tarea.descripcion
                  });
                  alert("actualizado");
                  setTareaEditada((prev) => ({
                    ...prev,
                    [tarea.id]: { titulo: '', descripcion: '' }
                  }));
                }}
              >
                Actualizar
              </button>
              <button
                className={estilo.bgRed}
                onClick={() => eliminarTarea(tarea.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
}
