/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const PieChart = ({ data }) => {
  const chartId = uuid()

  React.useEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: false,
        calculateAggregates: true,
        valueField: 'value',
        categoryField: 'category'
      })
    );

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff)
    });

    series.labelsContainer.set('paddingTop', 30)

    series.slices.template.adapters.add('radius', (radius, target) => {
      const { dataItem } = target;
      const high = series.getPrivate('valueHigh');

      if (dataItem) {
        const value = target.dataItem.get('valueWorking', 0);
        return radius * value / high
      }
      return radius;
    });

    series.data.setAll(data)

    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
      marginTop: 15,
      marginBottom: 15
    }));

    legend.data.setAll(series.dataItems);


    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [])

  return (
    <div id={chartId} className="w-full h-full" />
  )
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default PieChart
