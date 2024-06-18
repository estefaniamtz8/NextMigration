/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const ColumnChart = ({ data, xLabel, xLabelDisabled, yLabel, yLabelDisabled, yLabelPosition, labelText }) => {
  const chartId = uuid();

  React.useEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'label',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    yAxis.axisHeader.children.push(
      am5.Label.new(root, {
        text: yLabel || 'Fecha',
        fontWeight: '500',
        fontSize: '10px',
        height: yLabelDisabled ? 0 : 25,
        centerY: yLabelPosition || -230,
        opacity: yLabelDisabled ? 0 : 1,
      })
    );

    xAxis.axisHeader.children.push(
      am5.Label.new(root, {
        text: xLabel || 'Cantidad',
        fontWeight: '400',
        height: xLabelDisabled ? 0 : 1,
        opacity: xLabelDisabled ? 0 : 1,
        fontSize: '10px',
        x: -40,
        rotation: 270,
      })
    );
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'label',
        tooltip: am5.Tooltip.new(root, {
          labelText: labelText || '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add('fill', (fill, target) =>
      chart.get('colors').getIndex(series.columns.indexOf(target))
    );

    series.columns.template.adapters.add('stroke', (stroke, target) =>
      chart.get('colors').getIndex(series.columns.indexOf(target))
    );

    // Set data

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="h-full w-full" />;
};

export default ColumnChart;
