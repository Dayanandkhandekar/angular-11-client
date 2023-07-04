import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import alertify from '../../../node_modules/alertifyjs';
import { element } from 'protractor';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  users?: string;

  form: any = {
    username: null,
    email: null,
    password: null,
    uRole: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userId=0;

  constructor(private userService: UserService,
    private authService: AuthService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {

    this.userService.getUserBoard().subscribe(
      data => {
        this.users = JSON.parse(data);
        // this.users = data;
        console.log(this.users)
        // alert(this.content);
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
  }

  userArray = new Array;
  rolesArray = new Array;
  userName;
  email;
  addUserDetails = false;
  userDetailsTable = true;
  addUserButton = true;
  backButton = false;
  role2;

  onSubmit(): void {
    const { username, email, password, uRole } = this.form;

    // this.form.role=this.role2;
    // console.log(this.role2);
    // debugger

    if (this.userId == 0) {

      this.authService.register(username, email, password, uRole).subscribe(
        data => {
          // console.log(data);
          alertify.success("User Added Successfully");
          this.getAllUsers();
          this.userDetailsTable = true;
          this.addUserDetails = false;
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
    else {

      debugger
      this.authService.updateUser(username, email, password, uRole,this.userId).subscribe(
        data => {
          // console.log(data);
          alertify.success("User Updated Successfully");
          this.getAllUsers();
          this.userDetailsTable = true;
          this.addUserDetails = false;
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );


    }
  }

  addUser() {
    // this.clientForm.reset();
    this.addUserDetails = true;
    this.userDetailsTable = false;
    // clearRegForm();
  }

 
  onEditUser(user) {

    this.userId = user.id;
    this.form.username = user.username
    // this.userName=user.username;
    this.form.email = user.email
    this.form.password = user.password

    // user.roles.forEach(element => {
    this.form.uRole = user.roles[0].name;
    // });

    this.addUserDetails = true;
    this.userDetailsTable = false;

    // this.clientId=client.id

  }

  backToUserList() {
    this.addUserDetails = false;
    this.userDetailsTable = true;
    // this.getAllUsers();
  }

  onDeleteUser(user, index) {

    const _title = 'User Delete';
    const _description = 'Are you sure to permanently delete this User?';
    const _waitDesciption = 'User is deleting....';
    const _deleteMessage = `User has been deleted`;


    //call delete API here
    let deleteUserPayload = {
      "id": user.id
    }
    const deleteOptionSubscr = this.authService.deleteUser(deleteUserPayload).subscribe(response => {

      if (response) {
        // this.sectionArray = response;
        alertify.success(_deleteMessage)
        // this.toastrService.success(response);
      }
      else {
        alertify.error("Error")
      }
      this.userArray.splice(index, 1);
      // this.cdr.detectChanges();

      //this.getQuestionBySetId();
    },)
    // this.unsubscribe.push(deleteOptionSubscr);
    // });
  }
}
