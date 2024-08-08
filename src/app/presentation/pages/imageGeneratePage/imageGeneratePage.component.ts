import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-generate-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './imageGeneratePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGeneratePageComponent { }
