
import type { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment";

export const prosConsUseCase = async ( prompt:string ) => {

    try {

        const resp = await fetch( `${environment.backEndApi}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })

        if( !resp.ok ) throw new Error('No se puede realizar el discurso de pros y contras');

        const data = await resp.json() as ProsConsResponse;

        return {
            ok: true,
            ...data
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            role: '',
            content: 'No se podido realizar el discurso de pros y contras'
        }
    }

}