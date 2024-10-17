import { QuestionResponse } from "@interfaces/question.response";
import { environment } from "environments/environment";

export const postQuestionUseCase = async ( threadId:string, question:string ) => {
    
    try {

        const response = await fetch(`${ environment.assistantApi }/user-question`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ threadId, question })
        });

        const data = await response.json() as QuestionResponse[];
        
        console.log({data});
        
        return data;

        
    } catch (error) {
        throw new Error('Error creating question')
    }

}