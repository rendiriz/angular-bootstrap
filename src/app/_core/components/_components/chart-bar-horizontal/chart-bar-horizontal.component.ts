import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ViewEncapsulation, Input,
} from '@angular/core';
import { Router } from '@angular/router';

// SERVICE
import { GlobalService } from '@core/services';
import { ChartBarHorizontalService } from './chart-bar-horizontal.service';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';

@Component({
  selector: 'app-comp-chart-bar-horizontal',
  templateUrl: './chart-bar-horizontal.component.html',
  styleUrls: ['./chart-bar-horizontal.component.scss'],
  providers: [ChartBarHorizontalService],
  encapsulation: ViewEncapsulation.None
})

export class ChartBarHorizontalComponent implements OnChanges, OnDestroy {
  @ViewChild('chartBarHorizontal')
  private chartContainer!: ElementRef;

  @Input() chartData!: any;
  @Input() filters!: any;
  @Input() options: any = {
    margin: {
      top: 0,
      right: 0,
      bottom: 30,
      left: 125
    },
    color: '#069550',
    hoverText: 'Disukai'
  };

  moment: any = moment;

  contentWidth: any = 0;
  contentHeight: any = 0;
  dataset!: any;
  loading = true;

  animation: any;
  svg: any;
  canvas: any;
  context: any;
  g: any;
  x: any;
  y: any;
  color: any;
  xAxis: any;
  yAxis: any;
  dataPoint: any;
  tooltip: any;
  legends: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private chartService: ChartBarHorizontalService
  ) {
    setTimeout(() => {
      this.initData();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData && (changes.chartData.previousValue === undefined)) {
      return;
    }

    this.updateData();
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animation);
  }

  // Main Function
  onResize(event: any): void {
    this.updateData(100);
  }

  initData(): void {
    this.updateData();
  }

  updateData(percent: number = 0): void {
    if (!this.chartData) {
      setTimeout(() => {
        this.updateData();
      }, 500);
      return;
    }

    this.dataset = Object.assign(this.chartData, this.dataset);

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('svg').remove();
    d3.select(element).selectAll('canvas').remove();

    this.createChart(percent);

    this.loading = false;
  }

  createChart(percent: number = 0): void {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
    }

    const element = this.chartContainer.nativeElement;

    this.contentWidth = element.offsetWidth - this.options.margin.left - this.options.margin.right;
    this.contentHeight = element.offsetHeight - this.options.margin.top - this.options.margin.bottom;

    this.initDataChart();

    // Draw axis
    this.initSVG('bar-horizontal-axis-container');
    this.drawAxis();
    // End draw

    // Draw bar canvas
    this.initCanvas('bar-horizontal-container');
    this.drawBarCanvas(percent);
    // End draw

    this.initHighlightCanvas();
    this.drawLegend();
  }

  // Graphic Function
  initDataChart(): void {
    const data = this.dataset.sort((a: any, b: any) => d3.descending(a.value, b.value));

    this.x = d3
      .scaleLinear()
      .range([0, this.contentWidth])
      .domain([0, d3.max(data, (d: any) => _.toNumber(d.value)) as number]);

    this.y = d3
      .scaleBand()
      .rangeRound([0, this.contentHeight])
      .domain(data.map((d: any) => d.text))
      .padding(.5);

    this.dataPoint = [];
    this.dataset.forEach((d: any) => {
      this.dataPoint.push({
        x: this.x(d.value),
        y: this.y(d.text),
        ...d
      });
    });

    this.xAxis = d3.axisBottom(this.x)
      .tickSize(-this.contentHeight)
      .ticks(3);

    this.yAxis = d3.axisLeft(this.y)
      .tickSize(0);

    if (this.legends === undefined) {
      this.legends = [
        {
          text: 'Menyukai',
          color: this.options.color,
          type: 'rect',
          fillType: 'solid',
          show: true,
          selector: '.bar-horizontal-container'
        }
      ];
    }

    d3.selectAll('.bar-horizontal-tooltip').remove();
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'chart-tooltip bar-horizontal-tooltip')
      .style('opacity', 0);
  }

  initSVG(className: string = ''): void {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight + 50);

    if (className) {
      this.svg = this.svg.attr('class', className);
    }

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');
  }

  initCanvas(className: string): void {
    const element = this.chartContainer.nativeElement;

    this.canvas = d3.select(element).append('canvas')
      .attr('width', this.contentWidth)
      .attr('height', this.contentHeight)
      .style('position', 'absolute')
      .style('left', this.options.margin.left + 'px')
      .style('top', this.options.margin.top + 'px');

    this.context = this.canvas.node().getContext('2d');

    if (className) {
      this.canvas = this.canvas.attr('class', className);
    }
  }

  initHighlightCanvas(): void {
    const element = this.chartContainer.nativeElement;

    const highlightCanvas = d3.select(element).append('canvas')
      .attr('width', this.contentWidth)
      .attr('height', this.contentHeight)
      .style('position', 'absolute')
      .attr('class', 'highlight-bar-horizontal')
      .style('left', this.options.margin.left + 'px')
      .style('top', this.options.margin.top + 'px') as any;

    const highlightContext = highlightCanvas.node().getContext('2d');

    d3.select(element).select('.highlight-bar-horizontal')
      .on('mouseover', (event: any, d: any) => {
        this.tooltip.transition()
          .duration(100)
          .style('opacity', .9);
      })
      .on('mousemove', (event: any, d: any) => {
        const rect = highlightCanvas.node().getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;
        const selectedData = this.dataPoint.filter((content: any) => ( // cek kalo cursor dalam object
          canvasY >= content.y
          && canvasY <= content.y + this.y.bandwidth()));

        if (selectedData.length > 0) {
          const selectedX = selectedData[0].x;
          const selectedY = selectedData[0].y;

          highlightContext.clearRect(0, 0, this.contentWidth, this.contentHeight);

          highlightContext.globalAlpha = 0.6;
          this.drawRect(
            highlightContext,
            this.x(Math.min(0, selectedData[0].value)),
            selectedY,
            Math.abs(selectedX - this.x(0)),
            this.y.bandwidth(),
            '#FFFFFF'
            );
          highlightContext.globalAlpha = 1;

          this.tooltip.transition()
            .duration(100)
            .style('opacity', .9);
          this.tooltip.html('<b>' + selectedData[0].text
            + `</b><br/>${this.options.hoverText}: `
            + this.chartService.numberFormat(selectedData[0].value))
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 28) + 'px');
        } else {
          highlightContext.clearRect(0, 0, this.contentWidth, this.contentHeight);

          this.tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        }
      })
      .on('mouseout', (d: any) => {
        highlightContext.clearRect(0, 0, this.contentWidth, this.contentHeight);

        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  }

  drawAxis(): void {
    const axis = this.svg.append('g')
      .attr('class', 'axis-container');

    axis.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(120,' + this.contentHeight + ')')
      .call(this.xAxis)
      .selectAll('text')
        .style('text-anchor', 'middle');

    axis.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(120, 0)')
      .call(this.yAxis);
  }

  drawBarCanvas(percent: number = 0): void {
    // refresh frame
    if (percent++ < 100) {
      this.animation = window.requestAnimationFrame(() => this.drawBarCanvas(percent));
    }

    const data = this.dataset;

    this.context.clearRect(0, 0, this.contentWidth, this.contentHeight);

    data.forEach((d: any) => {
      const width = Math.abs(this.x(d.value) - this.x(0)) * percent / 100;

      this.drawRect(
        this.context,
        this.x(Math.min(0, d.value)),
        this.y(d.text),
        width,
        this.y.bandwidth(),
        this.options.color
      );
    });
  }

  drawRect(context: any, x: number, y: number, width: number, height: number, color: string): void {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  }

  drawLegend(): void {
    const legendSize = 20;
    const legendContainer = d3.select('.legend-bar-horizontal');
    legendContainer.selectAll('.legend-item').remove();

    d3.select('#btn-bar-horizontal-more').text('Tampilkan lebih banyak');

    const legendItem = legendContainer.selectAll('.legend-item')
      .data(this.legends)
      .enter().append('div')
      .attr('class', 'legend-item me-3 d-inline-flex align-items-center mb-3')
      .attr('id', (d: any, k: any) => 'legend-' + d.selector.replace('.', ''))
      .on('click', (e: any, d: any) => {
        let legendElement: any;

        if (e.target.nodeName === 'svg' || e.target.nodeName.toLowerCase() === 'span') {
          legendElement = e.target.parentElement;
        } else if (e.target.nodeName === 'line' || e.target.nodeName === 'circle' || e.target.nodeName === 'rect') {
          legendElement = e.target.parentElement.parentElement;
        } else {
          legendElement = e.target;
        }

        console.log(legendElement);
        const itemSelector = d3.selectAll(d.selector);
        itemSelector.classed('d-none', d3.select(legendElement).classed('active'));
        d3.select(legendElement).classed('active', !d3.select(legendElement).classed('active'));

        this.legends = this.legends.map((content: any) => {
          content.show = d3.select('#legend-' + content.selector.replace('.', '')).classed('active');
          return {
            ...content
          };
        });
      });

    legendItem.each((d: any, i: any, n: any) => {
      const item = d3.select(n[i]);

      item.classed('active', d.show);
      item.classed('d-none', i > 2);
      item.classed('legend-more', i > 2);

      const svg = item.append('svg')
        .attr('width', legendSize)
        .attr('height', legendSize)
        .attr('class', 'me-2');

      if (d.type === 'circle') {
        svg.append('circle')
          .attr('cx', legendSize / 2)
          .attr('cy', legendSize / 2)
          .attr('r', legendSize / 3)
          .attr('fill', d.color);
      } else if (d.type === 'line') {
        const line = svg.append('line')
          .attr('x1', 0)
          .attr('y1', legendSize / 2)
          .attr('x2', legendSize)
          .attr('y2', legendSize / 2)
          .attr('stroke', d.color)
          .attr('stroke-width', 2);

        if (d.fillType === 'dashed') {
          line.attr('stroke-dasharray', '5, 5');
        }
      } else {
        svg.append('rect')
          .attr('x', legendSize / 4)
          .attr('y', legendSize / 4)
          .attr('width', legendSize / 2)
          .attr('height', legendSize / 2)
          .attr('fill', d.color);
      }

      item.append('span')
        .attr('style', 'font-size: 12px')
        .text(d.text);
    });

    this.legends.forEach((d: any) => {
      d3.select(d.selector).classed('d-none', !d.show);
    });
  }

  toggleLegend(e: any): void {
    d3.selectAll('.legend-bar-horizontal .legend-more')
      .each((d: any, i: any, n: any) => {
        const item = d3.select(n[i]);

        item.classed('d-none', !item.classed('d-none'));
      });

    if (d3.select('.legend-bar-horizontal .legend-more').classed('d-none')) {
      e.target.innerText = 'Tampilkan lebih banyak';
    } else {
      e.target.innerText = 'Tutup legend';
    }
  }
}
