import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FilmPage } from '../film/film';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FilmPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
