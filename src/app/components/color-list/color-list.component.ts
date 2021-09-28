import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
