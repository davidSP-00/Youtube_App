import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { ɵangular_packages_platform_browser_platform_browser_a } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl="https://www.googleapis.com/youtube/v3";
  private apikey:string="AIzaSyBF3QvIoIwcrv4L-blwW_a5hJixJi7Y1gE";
  private playlist:string="UUdA8BFOLIbylIO054F6FHcw";

  private nextPageToken="";

  constructor(public http:HttpClient) { }


  getVideos(){
    let url=`${this.youtubeUrl}/playlistItems`;
    let params=new HttpParams();
    params=params.append('key',this.apikey)
    params=params.append('part','snippet');
    params=params.append('maxResults','10');
    params=params.append('playlistId',this.playlist);
    if(this.nextPageToken){
      params=params.append('pageToken',this.nextPageToken);
    }
    
    return this.http.get(url,{params:params}).pipe(map((res:any)=>{
      this.nextPageToken=res.nextPageToken;
      let videos:any[]=[];
      for(let video of res.items){
        let snippet =video.snippet;
        videos.push(snippet);
      }

      return videos;
    }));

  }
}
