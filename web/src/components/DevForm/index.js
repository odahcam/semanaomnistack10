import React, { useState, useEffect } from "react";
import parseStringAsArray from "../../utils/parseStringAsArray";

function DevForm(props) {

    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState(Number);
    const [longitude, setLongitude] = useState(Number);

    useEffect(() => {
        const position = navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords

                setLatitude(latitude)
                setLongitude(longitude)
            },
            error => console.error(error),
            {
                timeout: 30000,
            }
        );
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            github_username,
            techs: parseStringAsArray(techs),
            latitude,
            longitude,
        })

        setGithub_username('')
        setTechs('')
    }

    const { onSubmit } = props

    return (
        <form className="DevForm" onSubmit={handleSubmit}>

            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" value={latitude} onChange={e => setLatitude(Number(e.target.value))} required />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" value={longitude} onChange={e => setLongitude(Number(e.target.value))} required />
                </div>

            </div>

            <button type="submit">Salvar</button>

        </form>
    )
}

export default DevForm