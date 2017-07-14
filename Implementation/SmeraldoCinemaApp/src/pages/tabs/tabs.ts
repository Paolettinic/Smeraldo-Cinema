import { Component } from '@angular/core';

import { TicketsPage } from '../tickets/tickets';
import { InfoPage } from '../info/info';
import { FilmPage } from '../film/film';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FilmPage;
  tab2Root = TicketsPage;
  tab3Root = InfoPage;

  constructor() {}
  
}
