import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];
  // injecting the event service
  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this._eventService
      .getSpecialEvents()
      .subscribe(res => this.specialEvents = res, err => console.log(err));
  }

}
