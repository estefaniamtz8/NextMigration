/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const ScatterChart = ({ series, data }) => {
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
        wheelY: 'zoomXY',
        pinchZoomX:true,
        pinchZoomY:true,
        layout: root.verticalLayout
      }) 
    );

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    yAxis.get('renderer').grid.template.setAll({
      strokeWidth: 0,
      visible: false
    });


    xAxis.get('renderer').grid.template.setAll({
      location: 0.5,
      strokeWidth: 0,
      visible:false
    });

    series.forEach((serie) => {
      const chartSerie = chart.series.push(
        am5xy.LineSeries.new(root, {
          calculateAggregates: true,
          name: serie.name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: serie.valueYField,
          valueXField: serie.valueXField,
          tooltip: am5.Tooltip.new(root, {
            labelText: 'x: {valueX} y:{valueY}'
          })
        })
      );
      chartSerie.strokes.template.set('strokeOpacity', 0);
      chartSerie.data.setAll(data);
      chartSerie.set('fill', am5.color(serie.color))

      chartSerie.bullets.push(() => {
        const graphics = am5.Circle.new(root, {
          fill: chartSerie.get('fill'),
          radius: 5,
        });
        return am5.Bullet.new(root, {
          sprite: graphics
        });
      });
    })

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
    }));

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [])

  return (
    <div id={chartId} className="w-full h-full" />
  )
}

ScatterChart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default ScatterChart
