import React, { useState } from 'react'
import "./BusquedaTesoro.css";


const imageX = "./public/x.png";
const imageChest = "./public/chest.png";
const imageSkull = "./public/skull.png";


function BusquedaTesoro() {

    const [filas, setFilas] = useState(0);
    const [columnas, setColumnas] = useState(0);
    const [tesoroFilas, setTesoroFilas] = useState(0);
    const [tesoroColumnas, setTesoroColumnas] = useState(0);
    const [finDelJuego, setFinDelJuego] = useState(false);
    const [intentos, setIntentos] = useState(0);
    const [tablero, setTablero] = useState([]);

    const inicioJuego = () => {
        const filasPromp = parseInt(prompt('Indica el número de filas'));
        const columnasPromp = parseInt(prompt('Indica el número de columnas'));

        if (filasPromp && columnasPromp) {

            setFilas(filasPromp);
            setColumnas(columnasPromp);

            const posicionTesoroFila = Math.floor(Math.random() * filasPromp);
            const posicionTesoroColumna = Math.floor(Math.random() * columnasPromp);

            setTesoroFilas(posicionTesoroFila);
            setTesoroColumnas(posicionTesoroColumna);
            setIntentos(0);
            setFinDelJuego(false);

            const nuevoTablero = [];
            for (let i = 0; i < filasPromp; i++) {
                const fila = [];
                for (let j = 0; j < columnasPromp; j++) {
                    fila.push(imageX);
                }
                nuevoTablero.push(fila);
            }
            setTablero(nuevoTablero);
        }
    };

    const eventoClick = (filaIndex, columnaIndex) => {
        if (!finDelJuego) {
            setIntentos(prevIntentos => prevIntentos + 1);
            if (filaIndex === tesoroFilas && columnaIndex === tesoroColumnas) {
                setFinDelJuego(true);
                const tableroPro = [...tablero];
                tableroPro[filaIndex][columnaIndex] = imageChest;
                setTablero(tableroPro);
                setTimeout(() => {
                    alert('¡Enhorabuena! Has ganado'); // Luego muestra la alerta después de un pequeño retraso
                }, 200);
            } else {
                const tableroPro = [...tablero];
                tableroPro[filaIndex][columnaIndex] = imageSkull;
                setTablero(tableroPro);
            }
        }
    };


    return (
        <div className="BusquedaDelTesoro">
            <h1>Intentos: <span>{intentos}</span></h1>
            <table>
                <tbody>
                    {tablero.map((fila, filaIndex) => (
                        <tr key={filaIndex}>
                            {fila.map((columna, columnaIndex) => (
                                <td key={columnaIndex} onClick={() => eventoClick(filaIndex, columnaIndex)}>
                                    <img src={columna} alt="columna" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={inicioJuego}> Empezar a jugar</button>
        </div>
    )

};
export default BusquedaTesoro;
