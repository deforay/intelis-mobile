import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DatetimePickerData {
  label: string;
  value: Date | null;
  min: Date | null;
  max: Date | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Pick a day on the calendar, then the time from an hour grid and a minute grid.
// Closes with the picked Date, null for Clear, or undefined for Cancel.
@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
})
export class DatetimePickerComponent {
  data: DatetimePickerData = inject(MAT_DIALOG_DATA);
  ref = inject(MatDialogRef<DatetimePickerComponent>);

  readonly hours = Array.from({ length: 24 }, (_, i) => i);
  readonly minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  step: 'date' | 'time' = 'date';
  day: Date | null = null;
  hour: number;
  minute: number;

  constructor() {
    const start = this.data.value ?? this.clamp(this.wholeMinute(new Date()));
    this.hour = start.getHours();
    this.minute = start.getMinutes();
    if (this.data.value) {
      this.day = this.startOfDay(start);
    }
  }

  get startAt(): Date {
    return this.day ?? this.startOfDay(this.clamp(new Date()));
  }

  get dateText(): string {
    return this.day ? this.pad(this.day.getDate()) + '-' + MONTHS[this.day.getMonth()] + '-' + this.day.getFullYear() : 'Pick a Date';
  }

  get timeText(): string {
    return this.pad(this.hour) + ':' + this.pad(this.minute);
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  pickDay(day: Date | null) {
    if (!day) {
      return;
    }
    this.day = this.startOfDay(day);
    this.keepInRange();
    this.step = 'time';
  }

  pickHour(hour: number) {
    this.hour = hour;
    this.keepInRange();
  }

  pickMinute(minute: number) {
    this.minute = minute;
    this.keepInRange();
  }

  // -1 or +1 minute, within the same day and the allowed range.
  nudge(delta: number) {
    const day = this.day ?? this.startAt;
    const next = new Date(this.at(day, this.hour, this.minute).getTime() + delta * 60000);
    if (next.getDate() === day.getDate() && this.inRange(next)) {
      this.hour = next.getHours();
      this.minute = next.getMinutes();
    }
  }

  now() {
    const now = this.clamp(this.wholeMinute(new Date()));
    this.day = this.startOfDay(now);
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.step = 'time';
  }

  hourAllowed(hour: number): boolean {
    const day = this.day ?? this.startAt;
    const first = this.at(day, hour, 0);
    const last = this.at(day, hour, 59);
    return (!this.data.min || last >= this.data.min) && (!this.data.max || first <= this.data.max);
  }

  minuteAllowed(minute: number): boolean {
    return this.inRange(this.at(this.day ?? this.startAt, this.hour, minute));
  }

  set() {
    if (this.day) {
      this.ref.close(this.at(this.day, this.hour, this.minute));
    }
  }

  private keepInRange() {
    const picked = this.clamp(this.at(this.day ?? this.startAt, this.hour, this.minute));
    this.hour = picked.getHours();
    this.minute = picked.getMinutes();
  }

  private inRange(date: Date): boolean {
    return (!this.data.min || date >= this.data.min) && (!this.data.max || date <= this.data.max);
  }

  private clamp(date: Date): Date {
    if (this.data.min && date < this.data.min) {
      return new Date(this.data.min);
    }
    if (this.data.max && date > this.data.max) {
      return new Date(this.data.max);
    }
    return date;
  }

  private at(day: Date, hour: number, minute: number): Date {
    return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private wholeMinute(date: Date): Date {
    return this.at(date, date.getHours(), date.getMinutes());
  }
}
