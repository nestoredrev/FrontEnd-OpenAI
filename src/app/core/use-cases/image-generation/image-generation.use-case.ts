import { ImageGenerationResponse } from "@interfaces/imageGeneration.response";
import { environment } from "environments/environment";

export const imageGenerationUseCase = async ( prompt:string, originalImage?:string, maskImage?:string ) => {

    try {

        const response = await fetch(`${environment.backEndApi}/image-generation`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({prompt, originalImage, maskImage})
        })
        
        if( !response.ok ) throw new Error('No se ha podido generar la imagen');

        const { url, revised_prompt } = await response.json() as ImageGenerationResponse;

        return {
            ok: true,
            url,
            revised_prompt
        }

        
    } catch (error) {
        console.log(error);
        return null;
    }

} 