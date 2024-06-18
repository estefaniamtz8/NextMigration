/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AreaChart = ({ series, data, showLegends }) => {
  const chartId = uuid()

  React.useEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: true,
        panX: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        layout: root.verticalLayout
      }) 
    );

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'id',
        visible: false,
        startLocation: 0.5,
        endLocation: 0.5
      })
    );
    xAxis.data.setAll(data);

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        visible: false,
      })
    );

    yAxis.get('renderer').grid.template.setAll({
      strokeWidth: 0,
      visible:false
    });


    xAxis.get('renderer').grid.template.setAll({
      location: 0.5,
      strokeWidth: 0,
      visible:false
    });

    series.forEach((serie) => {
      const chartSerie = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: serie.name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueYField: serie.valueYField,
          categoryXField: serie.categoryXField,
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY}'
          })
        })
      );
      chartSerie.fills.template.setAll({
        fillOpacity: 1,
        visible: true
      });
      chartSerie.data.setAll(data);
      chartSerie.set('fill', am5.color(serie.color))
    })

    // Add legend
    if (showLegends) {
      const legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);
    }

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [])

  return (
    <div id={chartId} className="w-full h-full" />
  )
}

AreaChart.defaultProps = {
  showLegends: true,
}

AreaChart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  showLegends: PropTypes.bool,
}

export default AreaChart
