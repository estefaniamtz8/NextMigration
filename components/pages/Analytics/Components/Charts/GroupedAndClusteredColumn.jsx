/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React from 'react';
import { v4 as uuid } from 'uuid';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const ClusteredColumnChart = () => {
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
        paddingLeft: 0,
      })
    );

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({ text: '{realName}' });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
          labelText: '{realName}',
        }),
      })
    );
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const yAxis2 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        syncWithAxis: yAxis,
        renderer: am5xy.AxisRendererY.new(root, { opposite: true }),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        stacked: true,
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{provider} {realName}: {valueY}',
        }),
      })
    );

    const chartData = [];

    // Set data
    const data = {
      'Provider 1': [
        {
          viable: 1,
          period: 1,
          noviable: 2,
        },
        {
          viable: 3,
          period: 2,
          noviable: 4,
        },
        {
          viable: 5,
          period: 3,
          noviable: 6,
        },
        {
          viable: 7,
          period: 4,
          noviable: 8,
        },
      ],
      'Provider 2': [
        {
          viable: 1,
          period: 1,
          noviable: 2,
        },
        {
          viable: 3,
          period: 2,
          noviable: 4,
        },
        {
          viable: 5,
          period: 3,
          noviable: 6,
        },
        {
          viable: 7,
          period: 4,
          noviable: 8,
        },
      ],
    };

    // const data2 = {
    //   'Provider 1': {
    //     period: 1,
    //     viable: 10,
    //     noviable: 10,
    //   },
    //   'Provider 2': {
    //     period: 2,
    //     viable: 10,
    //     noviable: 10,
    //   },
    // };

    // process data ant prepare it for the chart
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const providerName in data) {
      const providerData = data[providerName];
      providerData?.forEach((providerPeriod) => {
        const period = providerPeriod;
        // add data of one provider to temp array
        const tempArray = [];
        let count = 0;
        // add items
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const itemName in period) {
          if (itemName !== 'period') {
            count++;
            // we generate unique category for each column (providerName + "_" + itemName) and store realName
            tempArray.push({
              stackedItem: `${providerName}${period.period}`,
              category: `${providerName}_${itemName}_${period.period}`,
              realName: itemName === 'viable' ? 'Viable' : 'No viable',
              value: period[itemName],
              provider: `${providerName} - ${period.period}`,
            });
          }
        }
        // sort temp array
        tempArray.sort((a, b) => {
          if (a.value > b.value) {
            return 1;
          }
          if (a.value < b.value) {
            return -1;
          }
          return 0;
        });

        // add quantity and count to middle data item (line series uses it)
        const lineSeriesDataIndex = Math.floor(count / 2);
        tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
        tempArray[lineSeriesDataIndex].count = count;
        // push to the final data
        am5.array.each(tempArray, (item) => {
          chartData.push(item);
        });

        // create range (the additional label at the bottom)

        const range = xAxis.makeDataItem({});
        xAxis.createAxisRange(range);

        range.set('category', tempArray[0].category);
        range.set('endCategory', tempArray[tempArray.length - 1].category);

        const label = range.get('label');
        label.setAll({
          text: tempArray[0].provider,
          dy: 30,
          fontWeight: 'bold',
          tooltipText: tempArray[0].provider,
        });

        const tick = range.get('tick');
        tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 0 });

        const grid = range.get('grid');
        grid.setAll({ strokeOpacity: 1 });
      });
    }
    // console.log('chartData');
    // console.log(chartData);
    // add range for the last grid
    const range = xAxis.makeDataItem({});
    xAxis.createAxisRange(range);
    range.set('category', chartData[chartData.length - 1].category);
    const tick = range.get('tick');
    tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });

    const grid = range.get('grid');
    grid.setAll({ strokeOpacity: 1, location: 1 });

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={chartId} className="h-full w-full" />;
};

export default ClusteredColumnChart;
