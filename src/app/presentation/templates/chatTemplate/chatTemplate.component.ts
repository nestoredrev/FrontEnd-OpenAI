import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, textMessageBoxEvent, textMessageEvent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([{text: 'Hola amigo mio', isGpt:false}]);
  public isLoading = signal<boolean>(false);
  
  public openAiService = inject(OpenAiService);

  handleMessage( prompt:string ){
    console.log({prompt});
  }

  // handleMessageWithFile( { prompt, file }:textMessageEvent ){
  //   console.log({prompt, file});
  // }

  // handleMessageWithSelect( { prompt, selectedOption }:textMessageBoxEvent){
  //   console.log({prompt, selectedOption});
  // }
}
