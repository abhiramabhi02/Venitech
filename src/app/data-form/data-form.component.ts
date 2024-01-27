import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  user: User = {Name: '', Address: '', Email: '', Mobile: '', Gender: ''}
  entries: User[] = []
  editingEntry: User | null = null;
  userForm!: NgForm;

  // pattern for the validation for email and mobile
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mobilePattern = /^[0-9]{10}$/;

  constructor(private dataService:ServicesService){}

  ngOnInit(): void {
   
    this.getData()
  }

 
 

  getData(){
    this.dataService.getData().subscribe((response:any)=>{
      if(response.success){
        console.log(response);
        this.entries = response.user
        console.log(this.entries, 'entry');
        
      }
      
    })
  }

  submitForm() {
    if (this.editingEntry) {
      console.log(this.user, 'user');
      
      // If editing, call editData from the service
      this.dataService.editData(this.user).subscribe(
        response => {
          // Handle the response from the backend if needed
          console.log('Edit Response:', response);
          this.entries = this.entries.map(entry => (entry === this.editingEntry ? this.user : entry));
          this.editingEntry = null;
          this.getData()
        },
        error => {
          // Handle error from the backend
          console.error('Edit Error:', error);
        }
      );
    } else {
      console.log(this.user);
      
      // If adding new data, call addData from the service
      this.dataService.addData(this.user).subscribe(
        response => {
          // Handle the response from the backend if needed
          console.log('Add Response:', response);
          this.entries.push({ ...this.user });
        },
        error => {
          // Handle error from the backend
          console.error('Add Error:', error);
        }
      );
    }
    this.getData()
    this.user = {Name: '', Address: '', Email: '', Mobile: '', Gender: '' };
  }
  

  editEntry(entry: User){
    this.user = {...entry}
    this.editingEntry = entry
  }
}
