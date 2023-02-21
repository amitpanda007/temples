import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable()
export class VideoService {
  private videos$!: Observable<Video[]>;

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage
  ) {}

  getVideos() {
    if (!this.videos$) {
      const videoCollection = collection(this.firestore, 'videos');
      this.videos$ = collectionData(videoCollection, {
        idField: 'id',
      }).pipe(shareReplay(1)) as Observable<Video[]>;
    }

    return this.videos$;
  }

  getVideo(id: string): Observable<Video> {
    return this.getVideos().pipe(
      map((videos: Video[]) => videos.find((video: Video) => video.id == id))
    ) as Observable<Video>;
  }
}

export interface Video {
  id?: string;
  name?: string;
}
