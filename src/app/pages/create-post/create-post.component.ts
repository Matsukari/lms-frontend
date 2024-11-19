import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploaderComponent } from '../../components/file-uploader/file-uploader.component';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FileUploaderComponent,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  user: any;
  form = new FormGroup({
    title: new FormControl(""),
    group: new FormControl<any | string>(""),
    desc: new FormControl(""),
    attachments: new FormArray([]),
    cover: new FormControl(""),
  })
  selectedGroupType = "Public";
  groupTypes: string[] = ['Public', "Class", "Club", "Organization", "Other Groups"];
  groups: any[] = [];
  filteredGroups: Observable<any[]>;
  constructor(
    private service: PostService,
    private userService: UserService,
    private groupService: GroupService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
    });
    this.filteredGroups = this.form.get("group").valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.groups.slice();
      })
    );
  }
  updateGroupTypeSelected() {
    this.groupService.getGroups(this.selectedGroupType.toUpperCase()).subscribe((data: any) => {
      this.groups = data;
    })
  }
  post() {
    var group = this.selectedGroupType != "Public" ? this.form.get("group").value.id : -1;
    //alert(group);
    this.service.post({
      source: this.user.id,
      group: group,
      title: this.form.get("title").value,
      desc: this.form.get("desc").value,
      cover: this.form.get("cover").value,
      attachments: this.form.get("attachments").value,
    }).subscribe((data: any) => {

    })
  }
  displayGroup(group: any): string {
    return group && group.name ? group.name : '';
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter(item => item.name.toLowerCase().includes(filterValue));
  }
}
