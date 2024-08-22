import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, textMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMessageBoxSelectComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);

  public languages = signal([
    { id: 'español', text: 'Español' },
    { id: 'búlgaro', text: 'Búlgaro' },
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);
  
  public openAiService = inject(OpenAiService);

    handleMessageWithSelect( { prompt, selectedOption }:textMessageBoxEvent){

      this.isLoading.set( true );
      this.messages.update( prev => [
        ...prev,
        {
          isGpt: false,
          text: prompt
        }
      ]);

    this.openAiService.translateText( prompt, selectedOption )
    .subscribe(resp => {
      
      this.isLoading.set( false );
      
      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.message
        }
      ])

    })
  }

}
