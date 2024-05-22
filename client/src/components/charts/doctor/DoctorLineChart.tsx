import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface DataPoint {
  x: string; // Expected to be a date string
  y: number;
}

interface Series {
  id: string;
  data: DataPoint[];
}

interface DoctorLineChartProps {
  data: Series[];
}

const DoctorLineChart: React.FC<DoctorLineChartProps> = ({ data }) => {
    return (
        <div style={{ height: "100%", width: "100%" }}>
          <ResponsiveLine
              data={data}
              margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
              xScale={{
                  type: "time",
                  format: "%Y-%m-%d",
                  useUTC: false,
                  precision: "day",
              }}
              xFormat="time:%Y-%m-%d"
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  format: "%b",
                  tickValues: "every 1 month",
                  legend: 'Month',
                  legendOffset: 30,
                  legendPosition: 'middle'
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Number of Appointments',
                  legendOffset: -60,
                  legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              colors={{ scheme: 'nivo' }}
              animate={true}
          />
        </div>
    );
};

export default DoctorLineChart;
