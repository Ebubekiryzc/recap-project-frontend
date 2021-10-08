import { ActivatedRoute } from '@angular/router';
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
  currentColor: Color;
  dataLoaded: boolean = false;
  dataWithRoute: boolean = false;
  allColors: string = 'All Colors';
  filterColorText: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.setCurrentColorById(params['colorId']);
        this.getAll();
      } else {
        this.getAll();
      }
    });
  }

  setCurrentColorById(colorId: number) {
    this.colorService.getById(colorId).subscribe((response) => {
      this.setCurrentColor(response.data);
      this.dataWithRoute = true;
    });
  }

  setCurrentColor(color?: Color): void {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (this.currentColor) {
      if (color.id == this.currentColor.id) {
        return 'active text-center';
      } else {
        return 'text-center';
      }
    } else {
      return 'text-center';
    }
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'active text-center';
    } else {
      return 'text-center';
    }
  }

  getAll(): void {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
}
