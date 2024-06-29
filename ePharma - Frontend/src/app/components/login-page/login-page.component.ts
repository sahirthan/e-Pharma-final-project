import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private router: Router, private userSerivce: UserService) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }




  async login(event: any) {

    let userName = event.target.username.value;
    let password = event.target.password.value;
    const alertPlaceholder = document.getElementById('alert-placeholder');

    const showAlertWarning = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation mx-4"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    const showAlertSuccess = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    if (userName == null || userName.trim() === "") {
      showAlertWarning("Please enter a username.", "warning");
    } else if (password == null || password.trim() === "") {
      showAlertWarning("Please enter a password.", "warning");
    } else {
      if (userName.toLowerCase().trim() === "admin" && password === "adminpassword") {
        let adminUser = {
          username: 'admin',
          password: '*********'
        };
        showAlertSuccess("Login Success", "success");
        this.userSerivce.isAdmin.emit(true);
        this.userSerivce.isLoggedIn.emit(true);
        localStorage.setItem('user', JSON.stringify(adminUser));
        this.router.navigate(['/productmanage']);
      } else {
        let myUsers;
        this.userSerivce.getUsers().then(users => {
          let subscription = users.subscribe(users => {
            myUsers = users.filter(user => (user.username === userName) && (user.password === password));
            if (myUsers.length > 0) {
              let myUser = myUsers[0];
              myUser.password = "";
              this.userSerivce.isUser.emit(true);
              this.userSerivce.isLoggedIn.emit(true);
              localStorage.setItem('user', JSON.stringify(myUser));
              this.router.navigate(['/home']);
            } else {
              showAlertWarning("User not found", "warning");
            }
            subscription.unsubscribe();
          });
        });
      }
    }
  }
}
