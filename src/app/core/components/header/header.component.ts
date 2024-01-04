import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserActionsComponent } from '../user-actions/user-actions.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
    UserActionsComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: [
    './header.large.component.css',
    './header.medium.component.css',
    './header.short.component.css'
  ]
})
export class HeaderComponent {
  @Input()
  cartAmount: number = 0;

  constructor(
    private readonly navigator: Router
  ){}
  
  redirect(){
    this.navigator.navigate(
      ["/catalog"],
      {
        queryParams: {
          page: 1
        }
      }
    )
  }
}
