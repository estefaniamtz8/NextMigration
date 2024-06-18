/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const XYInterval = () => {
  const chartId = uuid();

  React.useEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 50,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        visible: false,
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        visible: false,
      })
    );

    const colors = chart.get('colors');
    const data = [
      {
        x: 0,
        y: 400,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(0),
        },
      },
      {
        x: 14,
        y: 500,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(1),
        },
      },
      {
        x: 22,
        y: 550,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(0),
        },
      },
      {
        x: 26,
        y: 750,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(0),
        },
      },
      {
        x: 29,
        y: 930,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(1),
        },
      },
      {
        x: 43,
        y: 1020,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(0),
        },
      },
      {
        x: 50,
        y: 1200,
        fillSettings: {
          fillOpacity: 1,
          visible: true,
          fill: colors.getIndex(1),
        },
      },
    ];

    const series = chart.series.push(
      am5xy.StepLineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: xAxis,
        valueXField: 'x',
        valueYField: 'y',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueX}km: [bold]{valueY}m[/]',
        }),
      })
    );

    series.strokes.template.setAll({
      visible: false,
    });

    series.fills.template.setAll({
      fillOpacity: 1,
      visible: true,
      templateField: 'fillSettings',
    });

    series.data.setAll(data);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 10);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="-my-3 h-24 w-full" />;
};

export default XYInterval;
