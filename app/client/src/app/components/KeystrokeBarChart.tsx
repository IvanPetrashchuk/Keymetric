"use client";
import { ResponsiveBar } from "@nivo/bar";

interface KeyCount {
  key: string;
  count: number;
}

interface BarChartProps {
  data: KeyCount[];
}

const KeystrokeBarChart = ({ data }: BarChartProps) => (
  <div style={{ height: "500px", width: "100%" }}>
    <ResponsiveBar
      data={data}
      keys={["count"]}
      indexBy="key"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Кількість натискань",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Клавіша",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} натискань`}
    />
  </div>
);

export default KeystrokeBarChart;
