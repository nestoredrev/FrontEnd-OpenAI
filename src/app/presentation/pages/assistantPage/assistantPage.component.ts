import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TextMessageBoxComponent, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public threadId = signal<string|undefined>(undefined);
  
  public openAiService = inject(OpenAiService);


  ngOnInit(): void {
    this.openAiService.createThread()
    .subscribe( id => {
      this.threadId.set( id );
    })
  }

  handleMessage( question:string ){

    this.isLoading.set(true);
    this.messages.update( prev => [...prev, {text: question, isGpt: false}] );

    this.openAiService.postQuestion( this.threadId()!, question )
    .subscribe( replies =>{
      this.isLoading.set(false);

      for (const reply of replies) {
        for (const message of reply.content) {
          if(reply.role === 'assistant'){
            this.messages.update( prev => [
              ...prev,
              {
                text: message,
                isGpt: reply.role === 'assistant'
              }
            ])
          }
        }
      }

    })

  }

}
