import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  Router
} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input('titleHeader') titleHeader;
  @Input('isMenuOrBackButton') isMenuOrBackButton;

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    var onlyRouterURL = this.router.url.split(';');
    if (onlyRouterURL[0] == '/covid19-add-southsudan') {
      this.router.navigate(['/covid19-view-southsudan'], {
        replaceUrl: true
      });
    }
    else if(onlyRouterURL[0] == '/covid19-view-result-southsudan'){
      this.router.navigate(['/covid19-view-southsudan'], {
        replaceUrl: true
      });
    }
  }

}
