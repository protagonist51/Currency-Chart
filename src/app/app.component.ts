import { Component } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DataCollectionService} from "../shared/services/data-collection-service";
import {CurrencyObject} from "../shared/dto/currencyObject";
import {Observable} from "rxjs";

export var AB: CurrencyObject[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Chart with Angular 4!';
  subtitle = 'Bar Chart';

  private currencyData: CurrencyObject[] = [];

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(private dataCollectionService: DataCollectionService) {

  }

  ngOnInit() {
    this.initData();

    //// change the data periodically for every 5 minutes
    setInterval(() => {
      this.initData();
      console.log("EXE")
    }, 300000);
  }

  //Method to fetch the data from API
  private initData(): void{
    this.dataCollectionService
      .getAllCurrencyData()
      .subscribe(
        (currData) => {
          this.currencyData = currData;
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawBars();
        });
  }

  private initSvg() {
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.4);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 10]);
    this.x.domain(this.currencyData.map((d) => d.symbol));
    //this.y.domain([0, d3Array.max(this.currencyData, (d) => d.price_usd)]);
    this.y.domain([0, d3Array.max(this.currencyData, (d) => d.price_usd)]);
  }

  private drawAxis() {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y).ticks(10))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("DOLLAR VALUE");
  }

  private drawBars() {
    this.g.selectAll(".bar")
      .data(this.currencyData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.symbol) )
      .attr("y", (d) => this.y(d.price_usd) )
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.price_usd) );
  }
}
