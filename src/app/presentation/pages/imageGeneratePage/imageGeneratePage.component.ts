import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { TextMessageBoxComponent, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-image-generate-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './imageGeneratePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGeneratePageComponent {

  @ViewChild('chatContainer') private chatContainer!: ElementRef<HTMLElement>;

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  
  public openAiService = inject(OpenAiService);

  handleMessage( prompt:string ){
    this.isLoading.set(true);
    this.chatContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
    this.messages.update( prev => [
      ...prev,
      {isGpt: false, text: prompt}
    ])

    this.openAiService.imageGeneration( prompt ).subscribe(resp => {
      this.isLoading.set(false);
      if( !resp ) return;

      this.chatContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });

      this.messages.update( prev => [
        ...prev,
        {isGpt: true, text: resp.revised_prompt, imageInfo: resp}
      ] )

    })

  }
}
