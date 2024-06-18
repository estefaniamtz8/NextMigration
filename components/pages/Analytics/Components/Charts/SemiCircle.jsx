/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const RaddarChart = ({ data }) => {
  const chartId = uuid();

  React.useEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(40),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false,
      })
    );

    series.states.create('hidden', {
      startAngle: 180,
      endAngle: 180,
    });

    // series.labels.template.setAll({
    //   visible: false, // Oculta las etiquetas de todas las series
    // });

    chart.series.each((series) => {
      series.labels.template.setAll({
        visible: false, // Oculta las etiquetas de todas las series
      });
    });

    series.slices.template.setAll({
      cornerRadius: 5,
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });

    series.data.setAll(data);

    series.appear(1000, 100);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="h-full w-full" />;
};

RaddarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RaddarChart;
