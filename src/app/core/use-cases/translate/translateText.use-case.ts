import type { translateTextResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const translateTextUseCase = async ( prompt:string, lang:string ) => {

    try {

        const resp = await fetch( `${environment.backEndApi}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        })

        if( !resp.ok ) throw new Error('No se puede realizar la traducción');

        const { message } = await resp.json() as translateTextResponse;

        return {
            ok: true,
            message: message
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo realizar la traducción!'
        }
    }

}