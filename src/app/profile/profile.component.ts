import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  userArray = new Array;
  rolesArray = new Array;
  userName;
  email;
  addUserDetails = false;
  userDetailsTable = true;
  addUserButton = true;
  backButton = false;
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userArray.push(this.currentUser);
    this.userName =this.currentUser.username
    console.log(this.currentUser)
  }

  addUser() {
    // this.clientForm.reset();
    this.addUserDetails = true;
    this.userDetailsTable = false;
    // clearRegForm();
  }

  onEditUser(user) {

    this.userName=user.username;
    this.email=user.email;
    this.addUserDetails = true;
    this.userDetailsTable = false;

    // this.clientId=client.id

  }

  backToUserList() {
    this.addUserDetails = false;
    this.userDetailsTable = true;
    // this.getAllUsers();
  }

  onDeleteUser(user,index) {

    // const _title = 'Client Delete';
    // const _description = 'Are you sure to permanently delete this Client?';
    // const _waitDesciption = 'Client is deleting....';
    // const _deleteMessage = `Client has been deleted`;
    
    // const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    // dialogRef.afterClosed().subscribe(res => {
    //   if (!res) {
    //     return;
    //   }
    //   //call delete API here
    //   let deleteUserPayload = {
    //     "id": user.id
    //   }
    
    
    //   const deleteOptionSubscr = this.clientService.deleteClient(deleteUserPayload).subscribe(response => {
        
    //     if (response) {
    //       // this.sectionArray = response;
    //       alertify.success(_deleteMessage)
    //       // this.toastrService.success(response);
    //     }
    //     else{
    //       alertify.error("Error")
    //     }
    //     this.userArray.splice(index, 1);
    //     this.cdr.detectChanges();
        
    //     //this.getQuestionBySetId();
    //   }, (error: ErrorModel) => {
    //     error.errorCodes.forEach((err, index) => {
    //       this.toastrService.error((error.getErrorCodeKey(index)))
    //     });
    
    //   })
    //   this.unsubscribe.push(deleteOptionSubscr);
    // });
    }
    
}
