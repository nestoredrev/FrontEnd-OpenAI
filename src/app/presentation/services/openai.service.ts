import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {

    checkOrthography( prompt:string ){
        return from ( orthographyUseCase(prompt) );
    }

    prosConsDiscusser( prompt:string ){
        return from ( prosConsUseCase(prompt) );
    }
    
}