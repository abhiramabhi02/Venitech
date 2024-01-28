import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services.service';

interface User {
  Name: string;
  Address: string;
  Email: string;
  Mobile: string;
  Gender: string;
}

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  user: User = { Name: '', Address: '', Email: '', Mobile: '', Gender: '' };
  entries: User[] = [];
  editingEntry: User | null = null;
  userForm!: NgForm;

  // pattern for the validation for email and mobile
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mobilePattern = /^[0-9]{10}$/;

  constructor(private dataService: ServicesService) {}

  ngOnInit(): void {
    this.getData();
  }

  // this is the function to retrieve the data from the database
  getData() {
    this.dataService.getData().subscribe((response: any) => {
      if (response.success) {
        console.log(response);
        this.entries = response.user;
        console.log(this.entries, 'entry');
      }
    });
  }

  //submiting the form for both while adding new data and editing the existing data
  submitForm() {
    if (this.editingEntry) {
      console.log(this.user, 'user');

      this.dataService.editData(this.user).subscribe(
        (response) => {
          console.log('Edit Response:', response);
          this.entries = this.entries.map((entry) =>
            entry === this.editingEntry ? this.user : entry
          );
          this.editingEntry = null;
          this.getData();
        },
        (error) => {
          console.error('Edit Error:', error);
        }
      );
    } else {
      console.log(this.user);

      this.dataService.addData(this.user).subscribe(
        (response) => {
          console.log('Add Response:', response);
          this.entries.push({ ...this.user });
        },
        (error) => {
          console.error('Add Error:', error);
        }
      );
    }
    this.getData();
    this.user = { Name: '', Address: '', Email: '', Mobile: '', Gender: '' };
  }

  //make the form contains with the existing data for edit
  editEntry(entry: User) {
    this.user = { ...entry };
    this.editingEntry = entry;
  }
}
