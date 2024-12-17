import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {PermissionService} from "../../services/permission.service";

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

    daysOfWeek: string[] = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
    timeSlots: string[] = [
        '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
        '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
        '15:00 - 16:00', '16:00 - 17:00'
    ];

    events: any[] = [
        {timeSlot: '9:00 - 10:00', date: '2024-10-21', userId: 10, desc: 'baro'},
        {timeSlot: '13:00 - 14:00', date: '2024-10-22', userId: 1, desc: 'baro'},
        {timeSlot: '10:00 - 11:00', date: '2024-11-1', userId: 1, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-10-28', userId: 10, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-12-10', userId: 10, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-12-11', userId: 1, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-10-25', userId: 1, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-11-1', userId: 1, desc: 'baro'},
        {timeSlot: '11:00 - 12:00', date: '2024-10-23', userId: 10, desc: 'baro'},
    ];


    monthTranslations: { [key: string]: string } = {
        January: 'იანვარი',
        February: 'თებერვალი',
        March: 'მარტი',
        April: 'აპრილი',
        May: 'მაისი',
        June: 'ივნისი',
        July: 'ივლისი',
        August: 'აგვისტო',
        September: 'სექტემბერი',
        October: 'ოქტომბერი',
        November: 'ნოემბერი',
        December: 'დეკემბერი'
    };

    isModalOpen: boolean = false;

    constructor(private toastr: ToastrService, public permissionService: PermissionService) { }


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

    // Method to get events for a specific day and timeSlot
    getEventsForDayAndTime(day: Date, timeSlot: string) {
        const formattedDate = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
        return this.events.filter(event => event.date === formattedDate && event.timeSlot === timeSlot);
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
        this.currentMonthName = this.monthTranslations[this.currentDate.toLocaleString('default', {month: 'long'})];
    }

    previousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.updateWeek();
    }

    nextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.updateWeek();
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.updateWeek();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
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

    selectedDay!: Date;
    selectedTimeSlot!: string;


    openReservationModal(day: Date, timeSlot: string) {
        const now = new Date();
        const georgianOffset = 4 * 60 * 60 * 1000; // UTC+4 in milliseconds
        const localTime = new Date(now.getTime() + georgianOffset);

        // Adjust reservation day to Georgian timezone
        const reservationDate = new Date(day.getTime());
        const [startHour] = timeSlot.split(':').map(Number); // Extract start hour from timeSlot
        reservationDate.setHours(startHour, 0, 0, 0);

        const reservationTime = new Date(reservationDate.getTime() + georgianOffset);

        if (reservationTime.getTime() < localTime.getTime()) {
            this.toastr.warning('რანაირად ჯავშნი წარსულში?');
            return;
        }

        this.selectedDay = day;
        this.selectedTimeSlot = timeSlot;
        this.toggleModal();
    }

    handleReservation(desc: string) {
        this.makeReservation(this.selectedDay, this.selectedTimeSlot, desc);
        // this.description = ''; // Reset the description after reservation
        this.toggleModal();
    }

    makeReservation(day: Date, timeSlot: string, desc: string) {
        // const now = new Date();
        // const georgianOffset = 4 * 60 * 60 * 1000; // UTC+4 in milliseconds
        // const localTime = new Date(now.getTime() + georgianOffset);
        //
        // // Adjust reservation day to Georgian timezone
        // const reservationDate = new Date(day.getTime());
        // const [startHour] = timeSlot.split(':').map(Number); // Extract start hour from timeSlot
        // reservationDate.setHours(startHour, 0, 0, 0);
        //
        // const reservationTime = new Date(reservationDate.getTime() + georgianOffset);
        //
        // // Check if the reservation time is in the past
        // if (reservationTime.getTime() < localTime.getTime()) {
        //     this.toastr.warning('რანაირად ჯავშნი წარსულში?');
        //     return;
        // }

        const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;

        this.events.push({
            timeSlot: timeSlot,
            date: date,
            available: true,
            userId: 1,
            desc: desc
        });

        console.log(this.events);

    }

    deleteReservation(userId: number, day: Date, timeSlot: string) {
        const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
        this.events = this.events.filter(event => !(event.userId === userId && event.date === date && event.timeSlot === timeSlot));
    }

    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
    }

}
