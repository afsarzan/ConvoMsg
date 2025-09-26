import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-box',
  imports: [FormsModule],
  templateUrl: './landing-box.html',
  styleUrl: './landing-box.scss'
})
export class LandingBox {
  @Input() userName: string = '';
  @Output() setUserNameHandler = new EventEmitter<string>();

}
