import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Medicos', url: '/medicos-list', icon: 'person' },
  ];
  public labels = [];
  constructor() {}
}
