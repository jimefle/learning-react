import { useEffect, useState } from "react"
import '/src/App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
    // 1. Recupera un hecho aleatorio de gatos de la primera API

    const [fact, setFact] = useState('')
    const [imageUrl, setImage] = useState('hello')

    useEffect (()=>{
        fetch(CAT_ENDPOINT_RANDOM_FACT) // la API devuelve un json
            .then(res=> res.json())
            .then(data => {
                const { fact } = data
                setFact(fact) // hecho aleatorio

                // 2. Recuperar las primeras tres palabras del hecho
                const firstThreeWords = fact.split(' ',3).join(' ')

                // 3. Muestra una imagen de un gato con las primeras tres palabras.
                // obtengo la imagen de la segunda API

                fetch(`https://cataas.com/cat?json=true`)
                .then(res => res.json())
                .then(imag => {
                    const { _id } = imag
                    setImage(`https://cataas.com/cat/${_id}/says/${firstThreeWords}?fontColor=white`)
                })
            })
    },[])

    return(
        <main>
            <h1>App de gatos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && 
                <img
                    src={imageUrl} 
                    alt={`Image extracted using the first three word for "${fact}"`}></img>}
        </main>
    )
}