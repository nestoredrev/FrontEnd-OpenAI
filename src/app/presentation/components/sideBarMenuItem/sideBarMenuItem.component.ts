import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-menu-item',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './sideBarMenuItem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarMenuItemComponent {

  @Input({required: true}) description!: string;
  @Input({required: true}) icon!: string;
  @Input({required: true}) path!: string;
  @Input({required: true}) title!: string;
}
