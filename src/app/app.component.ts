import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { Photos } from './photos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular 7 CDK Virtual Scroll';
  ds = new MyDataSource(this.api);

  constructor(private api: ApiService) {}
}

export class MyDataSource extends DataSource<Photos> {

  private photos:Photos[];
  private dataStream = new BehaviorSubject<Photos[]>([]);

  constructor(private api: ApiService) {
    super();
  }

  connect() {
    this.api.getPhotos()
      .subscribe((photos) => {
        this.photos = photos;
        this.dataStream.next(this.photos);
      });

    return this.dataStream;
  }

  disconnect(): void {
  }

}
