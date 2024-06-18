/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const MapChart = ({ data }) => {
  const chartId = uuid();

  React.useEffect(() => {
    const root = am5.Root.new(chartId);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        wheelY: 'zoom',
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
        fill: '#E0E0E0',
        valueField: 'value',
        calculateAggregates: true,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}: {value}',
    });

    polygonSeries.set('heatRules', [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: 'value',
        min: am5.color(0xbaadeb),
        max: am5.color(0x5432cf),
        key: 'fill',
      },
    ]);

    polygonSeries.data.setAll(data);

    // am5map.MapPolygonSeries.new(root, {
    //   geoJSON: am5geodata_worldLow,
    //   exclude: ['AQ'],
    //   // fill: '#E0E0E0',
    //   valueField: 'value',
    //   calculateAggregates: true,
    // });

    // const bubbleSeries = chart.series.push(
    //   am5map.MapPointSeries.new(root, {
    //     valueField: 'value',
    //     calculateAggregates: true,
    //     polygonIdField: 'id',
    //   })
    // );

    // const circleTemplate = am5.Template.new({});
    //
    // bubbleSeries.bullets.push((root) => {
    //   const container = am5.Container.new(root, {});
    //
    //   return am5.Bullet.new(root, {
    //     sprite: container,
    //     dynamic: true,
    //   });
    // });

    // bubbleSeries.bullets.push((root) =>
    //   am5.Bullet.new(root, {
    //     sprite: am5.Label.new(root, {
    //       text: "{value.formatNumber('#.')}",
    //       fill: am5.color('#FFF'),
    //       populateText: true,
    //       centerX: am5.p50,
    //       centerY: am5.p50,
    //       textAlign: 'center',
    //     }),
    //     dynamic: true,
    //   })
    // );
    //
    // // minValue and maxValue must be set for the animations to work
    // bubbleSeries.set('heatRules', [
    //   {
    //     target: circleTemplate,
    //     dataField: 'value',
    //     min: 10,
    //     max: 50,
    //     minValue: 0,
    //     maxValue: 100,
    //     key: 'fill',
    //   },
    // ]);
    //
    // bubbleSeries.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="h-full w-full" />;
};

MapChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MapChart;
