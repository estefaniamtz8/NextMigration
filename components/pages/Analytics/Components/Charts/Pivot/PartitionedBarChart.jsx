/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const PartitionedBarChart = ({ data, type }) => {
  const chartId = uuid();

  React.useEffect(() => {
    const root = am5.Root.new(chartId);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.horizontalLayout,
        paddingLeft: 0,
      })
    );
    const legendData = [];
    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'name',
        fillField: 'color',
        strokeField: 'color',
        marginLeft: 20,
        y: 20,
        layout: root.verticalLayout,
        clickTarget: 'none',
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'period',
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 10,
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yAxis.get('renderer').labels.template.setAll({
      fontSize: 12,
      location: 0.5,
    });

    yAxis.data.setAll(data);

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'value',
        categoryYField: 'period',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
        }),
      })
    );

    series.columns.template.setAll({
      tooltipText: '{categoryY}: [bold]{valueX}[/]',
      width: am5.percent(90),
      strokeOpacity: 0,
    });

    series.columns.template.adapters.add('fill', (fill, target) => {
      if (target.dataItem) {
        // eslint-disable-next-line default-case
        switch (target.dataItem.dataContext.group) {
          case 'LGBTQI+':
            return chart.get('colors').getIndex(0);
          case 'Madre soltera':
            return chart.get('colors').getIndex(1);
          case 'Migrante':
            return chart.get('colors').getIndex(2);
          case 'Mujer en situación de vulnerabilidad económica':
            return chart.get('colors').getIndex(3);
          case 'Ninguno de los anteriores':
            return chart.get('colors').getIndex(4);
          case 'Persona retornada':
            return chart.get('colors').getIndex(5);
          case 'Refugiado':
            return chart.get('colors').getIndex(6);
        }
      }
      return fill;
    });

    series.data.setAll(data);

    function createRange(label, category, color) {
      const rangeDataItem = yAxis.makeDataItem({
        category: category,
      });
      yAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get('label').setAll({
        fill: color,
        text: label,
        location: 1,
        fontWeight: 'bold',
        dx: -130,
      });

      rangeDataItem.get('grid').setAll({
        stroke: color,
        strokeOpacity: 1,
        location: 1,
      });

      rangeDataItem.get('tick').setAll({
        stroke: color,
        strokeOpacity: 1,
        location: 1,
        visible: true,
        length: 130,
      });

      legendData.push({ name: label, color: color });
    }

    createRange('LGBTQI+', type === 2 ? '4-LG' : '12-LG', chart.get('colors').getIndex(0));
    createRange('Madre soltera', type === 2 ? '4-Ma' : '12-Ma', chart.get('colors').getIndex(1));
    createRange('Migrante', type === 2 ? '4-Mi' : '12-Mi', chart.get('colors').getIndex(2));
    createRange(
      'Mujer en situación de vulnerabilidad económica',
      type === 2 ? '4-Mu' : '12-Mu',
      chart.get('colors').getIndex(3)
    );
    createRange('Ninguno de los anteriores', type === 2 ? '4-Ni' : '12-Ni', chart.get('colors').getIndex(4));
    createRange('Persona retornada', type === 2 ? '4-Pe' : '12-Pe', chart.get('colors').getIndex(5));
    createRange('Refugiado', type === 2 ? '4-Re' : '12-Re', chart.get('colors').getIndex(6));

    legend.data.setAll(legendData);

    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="h-full w-full" />;
};

export default PartitionedBarChart;
