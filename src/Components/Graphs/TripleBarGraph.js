import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default class TripleBarGraph extends PureComponent {
  render() {
    // TODO: figure out how to make the height responsive. Maybe just hardcode heights across various sizes
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.props.xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          {Object.keys(this.props.barConfig).map(key => (
            <Bar key = {key} dataKey={key} name={this.props.barConfig[key]['name']} fill={this.props.barConfig[key]['color']} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
