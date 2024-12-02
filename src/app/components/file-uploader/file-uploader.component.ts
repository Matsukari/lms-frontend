import { Component, signal} from '@angular/core';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-file-uploader',
  imports: [
    //DragDropDirective,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  files = signal([]);

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.set(this.files().concat([element.name]))
      alert(this.files());
    }
  }
  deleteAttachment(index) {
    let arr = this.files();
    arr.splice(index, 1);
    this.files.set(arr);
  }
}
