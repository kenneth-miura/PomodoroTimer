import React, { PureComponent } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
  Legend
} from "recharts";
import moment from "moment";

//primarily based off https://github.com/recharts/recharts/issues/1028 (USE THIS)

const CustomTooltip = ({ active, payload, label }) => {
  console.log({ active });
  console.log({ payload });
  console.log({ label });
  if (active && payload && payload.length) {
    let timestamp = moment(payload[0]["value"]).format("HH:mm");
    return (
      <div className="custom-tooltip">
        <p className="label">{`Time:${timestamp}`}</p>
      </div>
    );
  }
  return null;
};
export default class DayScatterGraph extends PureComponent {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const ticks = [];
    for (let hour = 0; hour < 25; hour++) {
      var tick = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        0,
        0
      ).getTime();
      ticks.push(tick);
    }
    let endOfDay = new Date();
    endOfDay.setHours(23);
    endOfDay.setMinutes(59);
    endOfDay.setMinutes(59);
    this.state = {
      todayInMS: today.getTime(),
      endOfDayInMS: endOfDay.getTime(),
      ticks: ticks,
    };
  }

  xAxisFormatter = tickItem => {
    if (tickItem >= this.state.endOfDayInMS) {
      return "24";
    } else {
      return moment(tickItem).format("HH");
    }
  };

  // look into tickformatter
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
          <XAxis
            type="number"
            dataKey="timeInMS"
            name="Time "
            domain={[this.state.todayInMS, this.state.endOfDayInMS]}
            tickFormatter={this.xAxisFormatter}
            scale="time"
            interval={0}
            ticks={this.state.ticks}
          >
            <Label value="Hour" offset={-3} position="insideBottom"></Label>
          </XAxis>
          <XAxis name="inflow" dataKey="inFlow" hide={true} />
          <YAxis
            type="number"
            dataKey={this.props.yAxisKey}
            name={this.props.yAxisName}
          >
            <Label value={this.props.yAxisName} angle={-90} position="left" />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip />}
          />
          <Scatter
            name="In Flow"
            data={this.props.inFlowData}
            fill="#FF12FF"
          />
          <Scatter
            name="Not In Flow"
            data={this.props.notInFlowData}
            fill="#17FF1F"
          />
          <ReferenceLine y={0} stroke="#000" />
          <Legend/>
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
  //TODO: show the inflow stuff. Maybe change colour based on being inflowed
}
