/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const FunnelChart = ({ data, colors }) => {
  const chartId = uuid()

  React.useEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push( 
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout
      }) 
    );
  
    const series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: true,
        orientation: 'vertical',
        valueField: 'value',
        categoryField: 'category',
        bottomRatio: 1,
      })
    );

    series.get('colors').set('colors', colors.map((color) => am5.color(color)))
    series.links.template.setAll({
      height: 2
    })
    
    series.data.setAll(data)

    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
      marginTop: 15,
      marginBottom: 15
    }));
    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [])

  return (
    <div id={chartId} className="w-full h-full" />
  )
}

FunnelChart.defaultProps = {
  colors: ['#F7517F', '#F43469', '#C02464', '#3F4357', '#20242B']
}

FunnelChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
}

export default FunnelChart
