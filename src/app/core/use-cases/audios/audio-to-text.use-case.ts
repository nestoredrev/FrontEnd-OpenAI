import { AudioToTextResponse } from "@interfaces/audioToText.response";
import { environment } from "environments/environment";

export const audioToTextUseCase = async ( file: File, prompt?:string ) => {

    try {

        const formData = new FormData();
        formData.append('audioFile', file);

        if( prompt ){
            formData.append('prompt', prompt);
        }

        const resp = await fetch(`${environment.backEndApi}/audio-to-text`,{
            method: 'POST',
            body: formData
        })

        if( !resp.ok ) throw new Error(`No se pudo generar el texto a partir del fichero ${file.name}`);

        const data = await resp.json() as AudioToTextResponse;

        return data;
        
    } catch (error) {
        return null;
    }


}