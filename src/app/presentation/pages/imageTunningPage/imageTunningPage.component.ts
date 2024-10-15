import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, GptMessageEditableImageComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    GptMessageEditableImageComponent
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {

  public messages = signal<Message[]>([
    {
      isGpt: true,
      text: 'dumy image',
      imageInfo: {
        revised_prompt: 'Dummy image',
        url: 'http://localhost:3000/gpt/image-generation/1728993921073.png'
      }

    }
  ]);
  public isLoading = signal<boolean>(false);
  public originalImage = signal<string|undefined>(undefined);
  public maskImage = signal<string|undefined>(undefined);
  
  public openAiService = inject(OpenAiService);

  handleMessage( prompt:string ){
    
    this.isLoading.set(true);
    this.messages.update( prev => [
      ...prev,
      {isGpt: false, text: prompt}
    ])

    this.openAiService.imageGeneration( prompt, this.originalImage(), this.maskImage() ).subscribe(resp => {
      this.isLoading.set(false);
      if( !resp ) return;

      this.messages.update( prev => [
        ...prev,
        {isGpt: true, text: resp.revised_prompt, imageInfo: resp}
      ] )

    })
  }

  generateVariation(){
    this.isLoading.set(true);

    this.openAiService.imageVariation( this.originalImage()! ).subscribe(resp => {
      this.isLoading.set(false);
      if( !resp ) return;

      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true, 
          text: resp.openAIUrl, 
          imageInfo: {
            url: resp.url, 
            revised_prompt: 
            resp.openAIUrl
          }
        }
      ])
    })
  }

  handleImageChange( newImage:string, originalImage:string ){

    this.originalImage.set( originalImage );
    this.maskImage.set( newImage );

  }

}
