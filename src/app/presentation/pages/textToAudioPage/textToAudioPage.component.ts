import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, textMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxSelectComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public voices = signal<{id:string, text:string}[]>(
    [
      {id: 'alloy', text: 'Alloy'},
      {id: 'echo', text: 'Echo'},
      {id: 'fable', text: 'Fable'},
      {id: 'onyx', text: 'Onyx'},
      {id: 'nova', text: 'Nova'},
      {id: 'Shimmer', text: 'shimmer'}
    ]
  );
  
  public openAiService = inject(OpenAiService);

  handleMessageWithSelect( { prompt, selectedOption }:textMessageBoxEvent){
    
    const message = `${selectedOption} - ${prompt}`

    this.isLoading.set(true);
    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: message
      }
    ])

    this.openAiService.textToAudio(prompt, selectedOption)
    .subscribe( ({message, audioUrl}) => {
      this.isLoading.set(false);

      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: message,
          audioUrl: audioUrl
        }
      ])
    })
  }
}
