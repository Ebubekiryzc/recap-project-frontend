import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit {
  colors: Color[];
  currentColor?: Color;
  dataLoaded: boolean = false;
  allColors: string = 'All Colors';
  filterColorText: string = '';

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getAll();
  }

  setCurrentColor(color?: Color): void {
    this.currentColor = color;
  }

  getCurrentColorClass(color?: Color): string {
    return this.currentColor === color
      ? 'list-group-item active text-center'
      : 'list-group-item text-center';
  }

  getAllColorClass(): string {
    return !this.currentColor
      ? 'list-group-item list-group-item-action bg-secondary text-light text-center'
      : 'list-group-item list-group-item-action text-center';
  }

  getAll(): void {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
}
