import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mandir';
  public isOffline: boolean = false;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    if (navigator.onLine) {
      this.isOffline = false;
    } else {
      this.isOffline = true;
    }

    window.addEventListener('offline', () => {
      this.isOffline = true;
      this._snackBar.open('You are offline', 'Cancel', {
        duration: 2000,
      });
    });

    window.addEventListener('online', () => {
      this.isOffline = false;
      this._snackBar.open('Back online', 'Cancel', {
        duration: 2000,
      });
    });

    if ((navigator as any).standalone == false) {
      // This is an iOS device  and we are in browser
      this._snackBar.open('You can add this PWA to the Home Screen', '', {
        duration: 3000,
      });
    }

    if ((navigator as any).standalone == undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this._snackBar.open(
            'Do you want to install this App?',
            'install',
            { duration: 5000 }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              if (result.outcome == 'dismissed') {
                //TODO: Track on installation
              } else {
                //TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }
  }
}
