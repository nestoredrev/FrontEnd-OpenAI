import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  
  public openAiService = inject(OpenAiService);

  handleMessage( prompt:string ){

    this.isLoading.set(true);
    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.prosConsDiscusser( prompt )
      .subscribe(resp => {
        this.isLoading.set(false);
        
        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.content
          }
        ])

      })
  }
}
