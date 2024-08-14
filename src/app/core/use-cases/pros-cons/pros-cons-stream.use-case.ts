import { environment } from "environments/environment";

// funcion generadora
export async function* prosConsStreamUseCase( prompt:string, abortSignal: AbortSignal ){
    
    try {
        const resp = await fetch( `${environment.backEndApi}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
            signal: abortSignal
        })

        if( !resp.ok ) throw new Error('No se puede realizar el discurso de pros y contras');

        
        const reader = resp.body?.getReader();
        if( !reader ){
            console.log('No se puede generar el reader');
            throw new Error('No se puede generar el reader');
        }

        const decoder = new TextDecoder();
        let text = '';

        while ( true ) {
            const { value, done } = await reader.read();
            
            if( done ){
                break;
            }

            const decodedChunk = decoder.decode(value, { stream: true });
            text += decodedChunk;
            yield text;
        }
        
        return text;

    } catch (error) {
        return null;
    }
    
}