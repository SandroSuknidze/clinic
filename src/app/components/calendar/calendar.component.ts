import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonthName: string = '';
  currentDate: Date = new Date();
  currentDateFormatted: string = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}`
  description: string = '';

  // Days of the current week (Mon-Sun)
  displayedWeek: Date[] = [];

  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  timeSlots: string[] = [
    '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
    '15:00 - 16:00', '16:00 - 17:00'
  ];

  events: any[] = [
    { time: '9:00 - 10:00', date: '2024-10-21', id: 10, desc: 'baro' },
    { time: '13:00 - 14:00', date: '2024-10-22', id: 1, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-10-23', id: 10, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-10-28', id: 10, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-10-25', id: 10, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-11-23', id: 1, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-10-25', id: 1, desc: 'baro' },
    { time: '11:00 - 12:00', date: '2024-11-1', id: 1, desc: 'baro' },
    { time: '10:00 - 11:00', date: '2024-11-1', id: 1, desc: 'baro' },
  ];

  constructor() { }


  console() {
    // console.log("current year", this.currentYear);
    // console.log("currentMonthName", this.currentMonthName);
    // console.log("curreant date", this.currentDate);
    console.log("thisplayed week", this.displayedWeek);
    // console.log("formatted current date", this.currentDateFormatted);

  }
  ngOnInit(): void {
    this.updateWeek();
  }

  // Method to get events for a specific day and time
  getEventsForDayAndTime(day: Date, time: string) {
    const formattedDate = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    return this.events.filter(event => event.date === formattedDate && event.time === time);
  }

  // Update the displayed week and the current month/year
  updateWeek() {
    // Get the start date (Monday) of the current week
    let startOfWeek = this.getMonday(this.currentDate);
    this.displayedWeek = [];

    // Populate the displayedWeek array with the next 7 days (Mon-Sun)
    for (let i = 0; i < 7; i++) {
      this.displayedWeek.push(new Date(startOfWeek));
      startOfWeek.setDate(startOfWeek.getDate() + 1);
    }

    // Update the current year and month name
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonthName = this.currentDate.toLocaleString('default', { month: 'long' });
  }

  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateWeek();
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateWeek();
  }

  // Helper method to get the Monday of the current week
  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = (day <= 0 ? 7 : day) - 1; // Adjusting for Sunday
    const monday = new Date(date);
    monday.setDate(date.getDate() - diff);
    return monday;
  }

  makeReservation(day: Date, time: string) {
    const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;

    this.events.push({
      name: 'test',
      time: time,
      date: date,
      available: true,
      id: 1,
      desc: 'baro'
    });

  }

  deleteReservation(id: number, day: Date, time: string) {
    const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    this.events = this.events.filter(event => !(event.id === id && event.date === date && event.time === time));
  }

}
