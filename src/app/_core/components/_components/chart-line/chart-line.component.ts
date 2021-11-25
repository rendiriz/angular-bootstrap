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
import { ChartLineService } from './chart-line.service';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import * as d3 from 'd3';

@Component({
  selector: 'app-comp-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
  providers: [ChartLineService],
  encapsulation: ViewEncapsulation.None
})

export class ChartLineComponent implements OnChanges, OnDestroy {
  @ViewChild('chartLine')
  private chartContainer!: ElementRef;

  @Input() chartData!: any;
  @Input() filters!: any;
  @Input() options: any = {
    margin: {
      top: 20,
      right: 20,
      bottom: 100,
      left: 40
    },
    color: '#ffa600',
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
  path: any;
  pathLength: any;
  valueline: any;
  dataPoint: any;
  tooltip: any;
  legends: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private globalService: GlobalService,
    private chartService: ChartLineService
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
    this.updateData(false);
  }

  initData(): void {
    this.updateData();
  }

  updateData(animate: boolean = true): void {
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

    this.createChart(animate);

    this.loading = false;
  }

  createChart(animate: boolean = true): void {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
    }

    const element = this.chartContainer.nativeElement;

    this.contentWidth = element.offsetWidth - this.options.margin.left - this.options.margin.right;
    this.contentHeight = element.offsetHeight - this.options.margin.top - this.options.margin.bottom;

    this.initDataChart();

    // Draw axis
    this.initSVG('line-axis-container');
    this.drawAxis();
    // End draw

    // Draw bar canvas
    this.initSVG('line-container');
    this.drawLine(animate);
    // End draw

    this.initHighlightCanvas();
    this.drawLegend();
  }

  // Graphic Function
  initDataChart(): void {
    const data = this.dataset;

    this.x = d3
      .scaleBand()
      .range([0, this.contentWidth])
      .padding(0.5)
      .domain(data.map((d: any) => d.text));

    this.y = d3
      .scaleLinear()
      .rangeRound([this.contentHeight, 0])
      .domain([0, d3.max(data, (d: any) => (d.value * 1)) as number]);

    this.dataPoint = [];
    this.dataset.forEach((d: any) => {
      this.dataPoint.push({
        x: this.x(d.text),
        y: this.y(d.value),
        ...d
      });
    });

    this.xAxis = d3
      .axisBottom(this.x)
      .tickValues(this.x.domain().filter((d: any, i: any) => !(i % (Math.floor(this.x.domain().length / 16)))));

    this.yAxis = d3.axisLeft(this.y)
      .tickSize(-this.contentWidth)
      .ticks(5);

    this.valueline = d3.line()
      .x((d: any) => (this.x(d.text) + (this.x.bandwidth() / 2)) || 0)
      .y((d: any) => this.y(d.value) || 0);

    if (this.legends === undefined) {
      this.legends = [
        {
          text: 'Menyukai',
          color: this.options.color,
          type: 'line',
          fillType: 'solid',
          show: true,
          selector: '.line-container'
        }
      ];
    }

    d3.selectAll('.line-tooltip').remove();
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'chart-tooltip line-tooltip')
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
      .attr('class', 'highlight-line')
      .style('left', this.options.margin.left + 'px')
      .style('top', this.options.margin.top + 'px') as any;

    const highlightContext = highlightCanvas.node().getContext('2d');

    d3.select('.highlight-line')
      .on('mouseover', (event: any, d: any) => {
        this.tooltip.transition()
          .duration(100)
          .style('opacity', .9);
      })
      .on('mousemove', (event: any, d: any) => {
        let html = '';
        const rect = highlightCanvas.node().getBoundingClientRect();
        const canvasX = event.clientX - rect.left;

        // cek kalo cursor dalam area
        const selectedData = this.dataPoint.filter((content: any) => (
          canvasX >= ((content.x + (this.x.bandwidth() / 2)) || 0 ) - (this.x.bandwidth() / 2)
          && canvasX <= ((content.x + (this.x.bandwidth() / 2)) || 0 ) + (this.x.bandwidth() / 2)
        ));

        if (selectedData.length > 0) {
          const cx = selectedData[0].x + (this.x.bandwidth() / 2);
          const cy = selectedData[0].y;

          highlightContext.clearRect(0, 0, this.contentWidth, this.contentHeight);
          this.drawCircle(highlightContext, cx, cy, this.options.color, 5, true);

          html = '<b>'
            + selectedData[0].text
            + '</b><br/> ' + this.options.hoverText + ': ' + this.chartService.numberFormat(selectedData[0].value);
        }

        if (selectedData.length > 0) {
          this.tooltip.transition()
            .duration(100)
            .style('opacity', .9);
          this.tooltip.html(html)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        } else {
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
    // bottom axis
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.contentHeight + ')')
      .call(this.xAxis)
      .selectAll('text')
        .style('text-anchor', 'start')
        .attr('dx', '.9em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(65)');

    // left axis
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(this.yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('terkonfirmasi');
  }

  drawLine(animate: boolean = true): void {
    const data = this.dataset;

    this.path = this.g.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', this.valueline as any);

    this.pathLength = this.path.node().getTotalLength();

    if (animate) {
      this.animatePath();
    }
  }

  // repeat function to animate path
  animatePath(): void {
    if (this.path) {
      this.path.attr('stroke-dasharray', this.pathLength + ' ' + this.pathLength)
        .attr('stroke-dashoffset', this.pathLength)
        .transition()
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .duration(2000)
        .on('end', () => setTimeout(this.animatePath, 500));
    }
  }

  drawCircle(context: any, cx: number, cy: number, color: string = this.options.color, r: number = 1.5, stroke: boolean = false): void {
    context.fillStyle = color;
    context.beginPath();
    context.arc(cx, cy, r, 0, 2 * Math.PI);
    context.fill();

    if (stroke && (r > 1.5)) {
      context.strokeStyle = '#BDBDBD';
      context.strokeWidth = 1;
      context.stroke();
    }
  }

  drawLegend(): void {
    const legendSize = 20;
    const legendContainer = d3.select('.legend-line');
    legendContainer.selectAll('.legend-item').remove();

    d3.select('#btn-line-more').text('Tampilkan lebih banyak');

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
    d3.selectAll('.legend-line .legend-more')
      .each((d: any, i: any, n: any) => {
        const item = d3.select(n[i]);

        item.classed('d-none', !item.classed('d-none'));
      });

    if (d3.select('.legend-line .legend-more').classed('d-none')) {
      e.target.innerText = 'Tampilkan lebih banyak';
    } else {
      e.target.innerText = 'Tutup legend';
    }
  }
}
