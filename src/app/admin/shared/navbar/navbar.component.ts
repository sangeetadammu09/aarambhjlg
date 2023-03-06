import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName = localStorage.getItem('fullname');
  roles = localStorage.getItem('roles');

  constructor() { }

  ngOnInit(): void {
    console.log(this.roles)
  }

}
