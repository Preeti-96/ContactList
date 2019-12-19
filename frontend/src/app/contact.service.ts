import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {Contact} from "./contact";
import {ContactDataService} from "./contacts/contact-data.service";
import {Api} from "./api";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  error = new Subject<String>();
  id: any;

  constructor(private http: HttpClient, private contactDataService: ContactDataService) {
    this.getContacts().subscribe(contacts => {
      this.contactDataService.contactChanged.next(contacts);
    });

  }


  getContacts() {
    return this.http.get("http://localhost:3000/api/contacts").pipe(
      map((responseData) => {
        const response: Api<Contact[]> ={status: 0, message:'', result:[]};
        response.result=responseData['result'];
        return response.result;
      })
    );
  }


  // adding contacts
  addContact(newContact: Contact) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/api/contact", newContact, {headers: headers})
      .subscribe(responseData => {
        console.log(responseData['message']);
        this.getContacts().subscribe(contacts => {
          this.contactDataService.contactChanged.next(contacts);
        });
      }, error => {
        // @ts-ignore
        this.error.next(error.message);
      });
  }

  //Editing Contact
  editContact(id: any, updatedContact: Contact) {
    console.log('contactService');

    return this.http.put('http://localhost:3000/api/contact/' + id, updatedContact)
      .subscribe(responseData => {
        console.log(responseData['message']);
        this.getContacts().subscribe(contacts => {
          this.contactDataService.contactChanged.next(contacts);
        });
      }, error => {
        this.error.next(error.message);
      });

  }


  //Delete Contacts
  deleteContact(id) {
    return this.http.delete('http://localhost:3000/api/contact/' + id, {
      observe: "events",
      responseType: "text"
    }).pipe(
      tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log('contact deleted successfully');
          //console.log(event.type);
        }
        if (event.type === HttpEventType.Response) {
         // console.log(event.body);
        }
      })
    );
  }
}
