import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BootstrapProgress, BootstrapService } from '../service/bootstrap/bootstrap.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  standalone: false,
})
export class SetupPage implements OnInit, OnDestroy {
  progress: BootstrapProgress = { steps: [], done: false, failed: false };
  private sub: Subscription;
  private continued = false;

  constructor(private bootstrap: BootstrapService, private router: Router) {}

  ngOnInit() {
    this.sub = this.bootstrap.progress$.subscribe((p) => {
      this.progress = p;
      if (p.done && !this.continued) {
        this.continued = true;
        // Let the last tick render before moving on.
        setTimeout(() => this.router.navigate(['/app-password'], { replaceUrl: true }), 600);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  retry() {
    this.continued = false;
    this.bootstrap.start();
  }

  continueAnyway() {
    this.router.navigate(['/app-password'], { replaceUrl: true });
  }
}
