import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-small-category-list',
    templateUrl: './small-category-list.component.html',
    styleUrl: './small-category-list.component.css',
})
export class SmallCategoryListComponent implements AfterViewInit {
    showMore = false;
    isOverflowing = false;

    names = [
        'Name 1',
        'Name 2',
        'Name 3',
        'Name 4',
        'Name 5',
        'Name 6',
        'Name 7',
        'Name 8',
        'Name 9',
        'Name 10',
        'Name 11',
        'Name 12',
        'Name 13',
        'Name 14',
        'Name 15',
        'Name 16',
        'Name 17',
        'Name 18',
        'Name 19',
        'Name 20',
    ];

    @ViewChild('nameListContainer') nameListContainer!: ElementRef;

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkOverflow();
        });
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }

    checkOverflow() {
        const container = this.nameListContainer.nativeElement;
        if (container.scrollHeight > container.clientHeight) {
            this.isOverflowing = true;
        }
    }
}
