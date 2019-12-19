import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContactService} from "../../contact.service";
import {Subscription} from "rxjs";
import {ContactDataService} from "../contact-data.service";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f', {static: false}) addContactForm: NgForm;

  editMode = false;
  contactId: any;
  subscription: Subscription;
  contactData = {
    first_name: '',
    last_name: '',
    phone: ''
  };

  phone_invalid= false;

  constructor(private contactService: ContactService,
              private contactDataService: ContactDataService) {
  }

  ngOnInit() {
    this.phone_invalid=false;
  }

  ngAfterViewInit() {
    this.subscription = this.contactDataService.contactData.subscribe(contact => {
      this.editMode = true;
      this.addContactForm.setValue({
        firstName: contact.first_name,
        lastName: contact.last_name,
        phoneNo: contact.phone
      });
    });
    this.contactDataService.contactId.asObservable().subscribe(id => {
      this.contactId = id;
    });
  }

  onAddContact(contactForm: NgForm) {
    if (isNaN(contactForm.value.phoneNo)) {
      this.phone_invalid = true;
    }
    else {
      this.phone_invalid=false;
      this.contactData.first_name = contactForm.value.firstName;
      this.contactData.last_name = contactForm.value.lastName;
      this.contactData.phone = contactForm.value.phoneNo;

      if (this.editMode) {
        this.contactService.editContact(this.contactId, this.contactData);
        this.editMode = false;
      } else {
        this.contactService.addContact(this.contactData);
      }
      this.onClear();
    }
  }

  //
  onClear() {
    this.addContactForm.reset();
    this.editMode = false;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
