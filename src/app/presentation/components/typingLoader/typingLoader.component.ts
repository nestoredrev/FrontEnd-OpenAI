import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  styleUrl: './typingLoader.component.css',
  templateUrl: './typingLoader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent { }
