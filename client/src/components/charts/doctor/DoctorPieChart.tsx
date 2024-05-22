import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartData {
    id: string | number;
    label: string;
    value: number;
    color?: string;
}

interface DoctorPieChartProps {
    data: PieChartData[];
}

const DoctorPieChart: React.FC<DoctorPieChartProps> = ({ data }) => {
    const pieColors = ['#e63946', '#a8dadc', '#7838d4', '#21f1f1'];

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 30, right: 80, bottom: 50, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={pieColors}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            arcLinkLabelsColor={{ from: 'color', modifiers: [['darker', 2]] }}
            arcLabelsSkipAngle={10}
            animate={true}
            theme={{
                labels: {
                    text: {
                        fill: "#1d3557"
                    }
                }
            }}
        />
    );
};

export default DoctorPieChart;
