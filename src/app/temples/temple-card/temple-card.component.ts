import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Video, VideoService } from 'src/app/shared/services/video.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'temple-card',
  templateUrl: 'temple-card.component.html',
  styleUrls: ['temple-card.component.scss'],
})
export class TempleCardComponent implements OnInit {
  @Input() hasPrev: boolean = false;
  @Input() hasNext: boolean = false;

  @Output() moveUp: EventEmitter<any> = new EventEmitter();
  @Output() moveDown: EventEmitter<any> = new EventEmitter();

  cardVideo: any = '';
  @ViewChild('vid') videoElm: any;
  isMuted: boolean = true;
  routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private videoService: VideoService,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit() {
    const id = this.route.firstChild?.snapshot.params['id'];
    this.getVideoToPlay(id);
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const id = this.route.firstChild?.snapshot.params['id'];
        console.log(id);
        this.getVideoToPlay(id);
      });

    this.playerService.volumeConfigChanged.subscribe((config: boolean) => {
      this.isMuted = config;
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }

  getVideoToPlay(id: string) {
    this.videoService.getVideo(id!).subscribe((video: any) => {
      console.log(video);
      const ref = this.storage.ref(video.name);
      ref.getDownloadURL().subscribe((videoUrl) => {
        console.log(videoUrl);
        this.cardVideo = videoUrl;
      });
    });
  }

  playPauseVideo() {
    let video = this.videoElm.nativeElement;
    console.log(video);
    video.muted = true;
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_: any) => {
        let observer = new IntersectionObserver(
          (entries) => {
            console.log(entries);
            entries.forEach((entry) => {
              if (entry.intersectionRatio !== 1 && !video.paused) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(video);
      });
    }
  }

  videoVolumeControl() {
    let video = this.videoElm.nativeElement;
    this.playerService.volumeConfigChanged.next(!this.isMuted);
    video.muted = !video.muted;
  }

  playPause() {
    let video = this.videoElm.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  moveUpClicked() {
    this.moveUp.emit(true);
  }

  moveDownClicked() {
    this.moveDown.emit(true);
  }
}
