import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ChatMessageComponent, GptMessageOrthographyComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent implements OnInit {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  
  public openAiService = inject( OpenAiService );

  ngOnInit(){
    if( sessionStorage.getItem('message') ) {
      this.messages.set( JSON.parse( sessionStorage.getItem('message') ?? '' ) );
    }else{
      sessionStorage.setItem('message', JSON.stringify( this.messages() ));
    } 
  }

  

  handleMessage( prompt:string ){

    this.isLoading.set( true );
    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography( prompt )
    .subscribe(resp => {
      this.isLoading.set( false );
      
      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp
        }
      ])
      sessionStorage.setItem('message', JSON.stringify( this.messages() ));
    })
  }
}
