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
import { ChartDoughnutService } from './chart-doughnut.service';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';

@Component({
  selector: 'app-comp-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss'],
  providers: [ChartDoughnutService],
  encapsulation: ViewEncapsulation.None
})

export class ChartDoughnutComponent implements OnChanges, OnDestroy {
  @ViewChild('chartDoughnut')
  private chartContainer!: ElementRef;

  @Input() chartData!: any;
  @Input() filters!: any;
  @Input() options: any = {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    color: '#069550',
    hoverText: 'Disukai'
  };

  moment: any = moment;

  contentWidth: any = 0;
  contentHeight: any = 0;
  radius: any = 0;
  middle: any = 0;
  dataset!: any;
  loading = true;

  animation: any;
  svg: any;
  canvas: any;
  context: any;
  g: any;
  pie: any;
  arc: any;
  arcLabel: any;
  tooltip: any;
  legends: any;
  color: any;
  backgroundColor = [
    '#229975',
    '#c69b2c',
    '#8cad45',
    '#d2355a',
    '#428df7',
    '#74c7a2',
    '#b12bb1',
    '#bc5551',
    '#efc74b',
    '#ed8282',
    '#1a4fa6',
    '#b5b1ba',
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private chartService: ChartDoughnutService
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

    this.middle = Math.min(this.contentWidth, this.contentHeight) / 2;
    this.radius = Math.min(this.contentWidth, this.contentHeight) / 2 - (Math.min(this.contentWidth, this.contentHeight) / 2 * 0.05);

    this.initDataChart();

    // Draw chart doughnut
    this.initSVG('doughnut-container');
    this.drawPie();
    // End draw

    this.drawLegend();
  }

  // Graphic Function
  initDataChart(): void {
    const data = this.dataset;

    this.color = d3.scaleOrdinal()
      .domain(data.map((d: any) => d.text))
      .range(this.backgroundColor);

    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);

    this.arc = d3.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.4);

    this.arcLabel = d3.arc()
      .outerRadius(this.radius * 0.9)
      .innerRadius(this.radius * 0.9);

    this.legends = [
      ...this.dataset.map((content: any, key: any) => {
        return {
          text: content.text,
          color: this.backgroundColor[key],
          type: 'rect',
          fillType: 'solid',
          show: true,
          selector: '.doughnut-' + _.snakeCase(content.text),
          ...content
        };
      })
    ];

    d3.selectAll('.doughnut-tooltip').remove();
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'chart-tooltip doughnut-tooltip')
      .style('opacity', 0);
  }

  initSVG(className: string = ''): void {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    if (className) {
      this.svg = this.svg.attr('class', className);
    }

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');
  }

  drawPie(): void {
    const data = this.pie(this.legends.filter((d: any) => d.show === true));

    const arc = this.svg
      .append('g')
      .attr( 'transform', 'translate(' + (this.contentWidth / 2) + ',' + (this.contentHeight / 2) + ')')
      .attr('class', 'arc');

    const pie = arc.selectAll('.doughnut')
      .data(data)
      .enter()
      .append('g')
      .attr('class', (d: any) => 'doughnut doughnut-' + _.snakeCase(d.data.text));

    pie.append('path')
      .attr('d', this.arc)
      .attr('fill', (d: any) => d.data.color)
      .style('stroke-width', '3px')
      .style('stroke', '#F5F5F5')
      .on('mouseover', () => {
        this.tooltip.transition()
          .duration(100)
          .style('opacity', .9);
      })
      .on('mousemove', (event: any, d: any) => {
        this.tooltip.html('<b>' + d.data.text
          + '</b><br/>' + this.options.hoverText + ': '
          + this.chartService.numberFormat(d.data.value))
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });
  }

  drawLegend(): void {
    const legendSize = 20;
    const legendContainer = d3.select('.legend-doughnut');
    legendContainer.selectAll('.legend-item').remove();

    d3.select('#btn-doughnut-more').text('Tampilkan lebih banyak');

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

        const itemSelector = d3.selectAll(d.selector);
        itemSelector.classed('d-none', d3.select(legendElement).classed('active'));
        d3.select(legendElement).classed('active', !d3.select(legendElement).classed('active'));

        this.legends = this.legends.map((content: any) => {
          content.show = d3.select('#legend-' + content.selector.replace('.', '')).classed('active');
          return {
            ...content
          };
        });

        this.drawPie();
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
    d3.selectAll('.legend-doughnut .legend-more')
      .each((d: any, i: any, n: any) => {
        const item = d3.select(n[i]);

        item.classed('d-none', !item.classed('d-none'));
      });

    if (d3.select('.legend-doughnut .legend-more').classed('d-none')) {
      e.target.innerText = 'Tampilkan lebih banyak';
    } else {
      e.target.innerText = 'Tutup legend';
    }
  }
}
