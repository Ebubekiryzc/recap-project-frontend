import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit {
  colors: Color[];
  dataLoaded: boolean = false;
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
}
