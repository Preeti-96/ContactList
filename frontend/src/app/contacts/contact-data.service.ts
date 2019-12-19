import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Contact} from "../contact";
import {ContactService} from "../contact.service";

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {

  public contactData = new Subject<Contact>();
  public contactId = new Subject<any>();
  public contactChanged = new Subject<Contact[]>();
  contacts: Contact[];

  //public contactsBehaviourSubject = new BehaviorSubject < this.contact >();

  constructor() {

  }


  setContactToEdit(id: any, contact: Contact) {
    this.contactData.next(contact);
    console.log('id' + id);
    this.contactId.next(id);
    //it is publishing this value to all the subscribers that have already subscribed to this contactData
  }


}
