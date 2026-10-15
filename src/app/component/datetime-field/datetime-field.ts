import { AfterViewInit, Directive, ElementRef, forwardRef, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { localDatetime } from '../../service/common/common.service';
import { DatetimePickerComponent, DatetimePickerData } from './datetime-picker.component';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// A stored date-time (YYYY-MM-DDTHH:mm, or with a space and seconds) as a local Date, or null.
export function parseDatetime(value: any): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec(String(value ?? ''));
  if (!m) {
    return null;
  }
  const date = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0));
  // Reject placeholders such as 0000-00-00 and impossible dates, which Date would roll over.
  if (+m[1] < 1900 || date.getMonth() !== +m[2] - 1 || date.getDate() !== +m[3]) {
    return null;
  }
  return date;
}

// 15-Oct-2026 09:42, matching the DD-MMM-YYYY the date-only fields show.
export function displayDatetime(date: Date | null): string {
  if (!date) {
    return '';
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  return pad(date.getDate()) + '-' + MONTHS[date.getMonth()] + '-' + date.getFullYear() + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
}

// Opens the picker on a tap anywhere in the field's box, except on the clear icon.
function listenForTaps(renderer: Renderer2, input: HTMLElement, open: () => void): () => void {
  const field = input.closest('mat-form-field') ?? input;
  return renderer.listen(field, 'click', (event: Event) => {
    const target = event.target as Element;
    if (target.closest('ion-icon, .clearDateIcon, .clearDateTimeIcon, mat-error, mat-hint')) {
      return;
    }
    open();
  });
}

// While a picker is open, the Android back button closes it. The app's own handler (priority 0)
// would otherwise leave the form and lose what was entered; Ionic's overlays use 100.
function closeOnBack(platform: Platform, close: () => void): Subscription {
  return platform.backButton.subscribeWithPriority(101, close);
}

// Date-time fields: our own picker instead of the WebView's datetime-local input, whose
// behaviour changes between Android WebView versions (154 on Samsung opened nothing at all).
// The form value stays YYYY-MM-DDTHH:mm and the input still fires (change) after a pick.
@Directive({
  selector: 'input[appDatetime]',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatetimeFieldDirective), multi: true }],
  host: {
    inputmode: 'none',
    autocomplete: 'off',
    '(keydown)': 'onKeydown($event)',
    '(paste)': '$event.preventDefault()',
    '(blur)': 'onTouched()',
  },
})
export class DatetimeFieldDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() min: string;
  @Input() max: string;

  private el = inject(ElementRef<HTMLInputElement>).nativeElement as HTMLInputElement;
  private renderer = inject(Renderer2);
  private dialog = inject(MatDialog);
  private platform = inject(Platform);
  private value = '';
  private disabled = false;
  private opened = false;
  private unlisten: () => void;
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit() {
    this.unlisten = listenForTaps(this.renderer, this.el, () => this.open());
  }

  ngOnDestroy() {
    this.unlisten?.();
  }

  writeValue(value: any) {
    this.value = value ?? '';
    this.el.value = displayDatetime(parseDatetime(this.value));
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      return;
    }
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      this.open();
    }
  }

  open() {
    if (this.opened || this.disabled || this.el.disabled || this.el.readOnly) {
      return;
    }
    this.opened = true;
    const data: DatetimePickerData = {
      label: this.el.closest('mat-form-field')?.querySelector('mat-label')?.textContent?.trim() ?? '',
      value: parseDatetime(this.value),
      min: parseDatetime(this.min),
      max: parseDatetime(this.max),
    };
    const ref = this.dialog.open(DatetimePickerComponent, { data, autoFocus: false, width: '360px', maxWidth: '94vw', panelClass: 'datetime-picker-panel' });
    const back = closeOnBack(this.platform, () => ref.close());
    ref.afterClosed().subscribe((result: Date | null | undefined) => {
      back.unsubscribe();
      this.opened = false;
      this.onTouched();
      if (result === undefined) {
        return;
      }
      this.writeValue(result ? localDatetime(result) : '');
      this.onChange(this.value);
      this.el.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}

// Date-only fields (Material's calendar): open it on a tap anywhere in the field, not only on
// the calendar icon. A disabled calendar icon marks the field as locked.
@Directive({
  selector: 'input[matDatepicker]',
  standalone: true,
})
export class DateFieldTapDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLInputElement>).nativeElement as HTMLInputElement;
  private renderer = inject(Renderer2);
  private input = inject(MatDatepickerInput);
  private platform = inject(Platform);
  private unlisten: () => void;
  private subscriptions = new Subscription();
  private back: Subscription | null = null;

  ngAfterViewInit() {
    const datepicker = this.input._datepicker as MatDatepicker<unknown> | undefined;
    if (datepicker) {
      this.subscriptions.add(datepicker.openedStream.subscribe(() => {
        this.back = closeOnBack(this.platform, () => datepicker.close());
      }));
      this.subscriptions.add(datepicker.closedStream.subscribe(() => {
        this.back?.unsubscribe();
        this.back = null;
      }));
    }
    this.unlisten = listenForTaps(this.renderer, this.el, () => {
      const picker = this.input._datepicker;
      const toggle = this.el.closest('mat-form-field')?.querySelector('mat-datepicker-toggle button') as HTMLButtonElement | null;
      if (!picker || picker.opened || this.el.disabled || toggle?.disabled) {
        return;
      }
      picker.open();
    });
  }

  ngOnDestroy() {
    this.unlisten?.();
    this.subscriptions.unsubscribe();
    this.back?.unsubscribe();
  }
}
