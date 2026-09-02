import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sorting-popover',
  templateUrl: './sorting-popover.component.html',
  styleUrls: ['./sorting-popover.component.scss'],
})
export class SortingPopoverComponent implements OnInit {
  @Input() sortedData: any;

  order;
  value;

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
    // Ensure the component initializes with the passed sortedData
    this.order = this.sortedData?.order || 'des'; // Default to 'des' if not provided
    this.value = this.sortedData?.value || ''; // Default to empty string if not provided

    console.log('Initial sort value:', this.value);
    console.log('Initial order value:', this.order);
  }

  setOrder(order) {
    this.order = order;
  }

  setValue(value) {
    this.value = value;
  }

  async applySorting() {
    const sortedData = {
      order: this.order,
      value: this.value
    };
    await this.popoverController.dismiss(sortedData);
  }

  async close() {
    await this.popoverController.dismiss();
  }
}
