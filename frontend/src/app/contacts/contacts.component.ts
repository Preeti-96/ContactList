import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ContactService} from "../contact.service";
import {Contact} from "../contact";
import {ContactDataService} from "./contact-data.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Input() contacts: Contact[];

  @Output() onEdit = new EventEmitter<{ firstName: string, lastName: string, phoneNo: string }>();

  constructor(private contactService: ContactService,
              private contactDataService: ContactDataService) {
    /*this.contactService.getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;

      })*/

  }

  ngOnChanges(): void {
    /*this.contactService.getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      })*/

  }

//Edit Contact
  editContact(id: any) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (id === this.contacts[i]._id) {
        let contactToEdit = {
          first_name: this.contacts[i].first_name,
          last_name: this.contacts[i].last_name,
          phone: this.contacts[i].phone
        };
        this.contactDataService.setContactToEdit(id, contactToEdit);
      }
    }
  }


//delete Contact- calling delete contact from service
//removing from contact;
  deleteContact(id: any) {
    this.contactService.deleteContact(id)
      .subscribe(() => {
        for (let i = 0; i < this.contacts.length; i++) {
          if (id === this.contacts[i]._id) {
            this.contacts.splice(i, 1);
          }
        }
      });
  }

  ngOnInit() {
    this.contactService.getContacts();
    /*.subscribe(contacts => {
      this.contacts = contacts;
    })*/
    this.contactDataService.contactChanged.subscribe(contacts => {
      this.contacts = contacts;
    })
    //this.contactService.getContacts();
  }
}
