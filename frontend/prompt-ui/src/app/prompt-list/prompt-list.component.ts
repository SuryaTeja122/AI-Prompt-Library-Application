import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-list.html'
})
export class PromptListComponent implements OnInit {

  prompts: any[] = [];

  constructor(private service: PromptService) {}

  ngOnInit() {
  this.service.getPrompts().subscribe({
    next: (res: any) => {
      console.log("DATA:", res);
      this.prompts = res || [];
    },
    error: (err) => {
      console.error("ERROR:", err);
      this.prompts = [];
    }
  });
  }
}