import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video, VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'temple-list',
  templateUrl: 'temple-list.component.html',
  styleUrls: ['temple-list.component.scss'],
})
export class TempleListComponent implements OnInit {
  hasPrev: boolean = false;
  hasNext: boolean = false;
  curIndex: number = 0;
  videoDocuments: Array<Video> = [];
  currentlyViewing: string = '';

  constructor(private router: Router, private videoService: VideoService) {}

  async ngOnInit() {
    this.videoService.getVideos().subscribe((videos: Video[]) => {
      this.videoDocuments = videos;
      this.currentlyViewing = this.videoDocuments[this.curIndex].id!;
      this.router.navigateByUrl(`shorts/${this.currentlyViewing}`);
      this.calculateVideoAvailability();
    });
  }

  public previousVideo($event: any) {
    this.currentlyViewing = this.videoDocuments[(this.curIndex -= 1)].id!;
    this.router.navigateByUrl(`shorts/${this.currentlyViewing}`);
    this.calculateVideoAvailability();
  }

  public nextVideo($event: any) {
    this.currentlyViewing = this.videoDocuments[(this.curIndex += 1)].id!;
    this.router.navigateByUrl(`shorts/${this.currentlyViewing}`);
    this.calculateVideoAvailability();
  }

  calculateVideoAvailability() {
    this.hasPrev = this.curIndex == 0 ? false : true;
    this.hasNext =
      this.curIndex < this.videoDocuments.length - 1 ? true : false;
  }
}
