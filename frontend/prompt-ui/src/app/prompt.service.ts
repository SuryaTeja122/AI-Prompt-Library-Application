import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  api = 'http://localhost:8000/prompts/';

  constructor(private http: HttpClient) {}

  getPrompts() {
    return this.http.get(this.api);
  }

  getPrompt(id: string) {
    return this.http.get(this.api + id + '/');
  }

  createPrompt(data: any) {
    return this.http.post(this.api + 'create/', data);
  }
}