import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cryptoGO-ui';

  isLoading: Subject<boolean> = this.loader.isLoading;

  constructor(private loader: LoaderService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }
}
