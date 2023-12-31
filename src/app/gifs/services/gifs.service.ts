import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {


  public gifList : Gifs[] = []
  private _tagsHistory: string[] = [];
  private apiKey: string = 'xZhvEvB8e38ui4s0EFJu2lSQzKHqdp0D';
  private serviceUrl = 'https://api.giphy.com/v1/gifs'


  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
  }


  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }


  private organizeTagsHistory(tag: string): void {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }


  private saveLocalStorage () : void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }


  private loadLocalStorage() : void {
    if(!localStorage.getItem('history')) this.searchTag('Kittys');
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }


  async searchTag(tag: string): Promise<void> {
    if(tag.trim().length === 0) return;
    this.organizeTagsHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      })
  }
}
