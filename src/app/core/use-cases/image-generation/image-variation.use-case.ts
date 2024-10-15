import { ImageVariationResponse } from "@interfaces/imageVariation.response";
import { environment } from "environments/environment";



export const imageVariationUseCase = async ( originalImage?:string ) => {

    try {

        const response = await fetch(`${environment.backEndApi}/image-variation`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ baseImage: originalImage })
        })
        
        if( !response.ok ) throw new Error('No se ha podido generar la imagen');

        const { url, openAIUrl } = await response.json() as ImageVariationResponse;

        return {
            ok: true,
            url,
            openAIUrl
        }

        
    } catch (error) {
        console.log(error);
        return null;
    }

} 