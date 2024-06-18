import React from 'react';
import {
  PivotGrid,
  PivotGridContainer,
  PivotGridColumn,
  PivotGridConfigurator,
  usePivotLocalDataService,
  PivotGridConfiguratorButton,
} from '@progress/kendo-react-pivotgrid';
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartArea,
  ChartTooltip,
  ChartSeriesItemTooltip,
} from '@progress/kendo-react-charts'

import { getCollectionMain } from 'services/firebase';

import {
  parseDataForPivot,
  dimensions,
  measures,
  defaultMeasureAxes,
  defaultRowAxes,
  defaultColumnAxes,
  defaultFilter,
  defaultSort,
  getChartData
} from './utils'

const WideColumn = React.forwardRef((props) => (
  <PivotGridColumn
    {...props}
    style={{
      width: 150,
    }}
  />
));

const PivotChart = React.forwardRef((_, ref) => {
  const [isRequesting, setRequesting] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState([])

  const serviceArgs = React.useMemo(() => ({
    dimensions,
    measures,
    data,
    defaultRowAxes,
    defaultColumnAxes,
    defaultMeasureAxes,
    defaultSort,
    defaultFilter
  }), [data])

  const { pivotProps, configuratorProps, state } = usePivotLocalDataService(serviceArgs);

  const handleButtonClick = React.useCallback(() => {
    setShow(!show);
  }, [show]);

  const tooltipRender = React.useCallback((args) => {
    const { point } = args;
    const { series } = point;
    return (
      <div>
        {series.name === series.stack
          ? series.name
          : `${series.stack  }/${  series.name}`}
        : {point.value}
      </div>
    );
  }, []);

  const { series, categories } = getChartData(pivotProps);

  React.useEffect(() => {
    const fetchData = async () => {
      setRequesting(() => true)
      const data = await getCollectionMain('/users');
      setData(() => parseDataForPivot(data.info))
      setRequesting(() => false)
    }
    fetchData()
      .catch(() => {
        setRequesting(() => false)
        setError(() => true)
      });
  }, [])

  if (error) {
    return (
      <h2 className="text-2xl font-medium text-[#EB702E] text-center flex items-center justify-center w-full h-full">
        Hubo un problema al obtener la información, vuelve a intentarlo más tarde...
      </h2>
    )
  }

  return (
    <div className="p-4">
      <div className="flex h-full flex-col gap-8">
        {isRequesting ? (
          <h2 className="text-2xl font-medium text-center py-10 flex items-center justify-center w-full h-full">Cargando Información...</h2>
        ) : (
          <PivotGridContainer>
            <PivotGrid {...pivotProps} ref={ref} className="h-full" column={WideColumn} />
            {show && <PivotGridConfigurator {...configuratorProps} />}
            <PivotGridConfiguratorButton onClick={handleButtonClick} />
            {state.loading && <p>Loading...</p>}
          </PivotGridContainer>
        )}
        <div className="h-full w-full">
          <Chart>
            <ChartArea height={500} />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories} startAngle={45} />
            </ChartCategoryAxis>
            <ChartTooltip shared={false} render={tooltipRender} />
            <ChartSeries>
              {series.map((item, idx) => (
                <ChartSeriesItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  type="column"
                  data={item.data}
                  name={item.name}
                  stack={item.stack}
                >
                  <ChartSeriesItemTooltip />
                </ChartSeriesItem>
              ))}
            </ChartSeries>
          </Chart>
        </div>
      </div>
    </div>
  );
})

export default PivotChart;
