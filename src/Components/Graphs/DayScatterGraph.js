import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { x: 100, a:100, y: 200, z: 200 },
  { x: 120, a:100, y: 100, z: 260 },
  { x: 170, a:100, y: 300, z: 400 },
  { x: 140, a:100, y: 250, z: 280 },
  { x: 150, a:100, y: 400, z: 500 },
  { x: 110, a:100, y: 280, z: 200 },
];

export default class DayScatterGraph extends PureComponent {
  // include the behaviour with color changes depending on whether the activity was in flow or not
  // include the be

  render() {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey={this.props.xAxisKey} name={this.props.xAxisName}  />
          <YAxis type="number" dataKey={this.props.yAxisKey} name={this.props.yAxisName}/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.props.data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
