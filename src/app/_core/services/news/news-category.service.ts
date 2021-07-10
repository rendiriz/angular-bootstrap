import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// MODELS
import { NewsCategory } from '@models';

@Injectable({
  providedIn: 'root',
})
export class NewsCategoryService {
  // API URL
  apiUrl = `api-backend/cms/news-category`;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getTotal(params: any): Observable<NewsCategory> {
    const merge = new URLSearchParams(params);
    return this.http
      .get<NewsCategory>(`${this.apiUrl}/total?${merge}`, this.httpOptions)
      .pipe(map((response) => new NewsCategory().deserialize(response)));
  }

  getList(params: any): Observable<NewsCategory> {
    const merge = new URLSearchParams(params);
    return this.http
      .get<NewsCategory>(`${this.apiUrl}?${merge}`, this.httpOptions)
      .pipe(map((response) => new NewsCategory().deserialize(response)));
  }

  getSingle(uniq: any, params: any): Observable<NewsCategory> {
    const merge = new URLSearchParams(params);
    return this.http
      .get<NewsCategory>(`${this.apiUrl}/${uniq}?${merge}`, this.httpOptions)
      .pipe(map((response) => new NewsCategory().deserialize(response)));
  }

  createItem(item: any): Observable<NewsCategory> {
    return this.http
      .post<NewsCategory>(this.apiUrl, JSON.stringify(item), this.httpOptions)
      .pipe(map((response) => new NewsCategory().deserialize(response)));
  }

  updateItem(uniq: any, item: any): Observable<NewsCategory> {
    return this.http
      .put<NewsCategory>(`${this.apiUrl}/${uniq}`, JSON.stringify(item), this.httpOptions)
      .pipe(map((response) => new NewsCategory().deserialize(response)));
  }
}
