import React, { PureComponent } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const data = [
  { x: Date.parse("2021-06-29 9:38:36"), y: 200, z: 200 },
  { x: Date.parse("2021-06-29 10:38:43"), y: 100, z: 260 },
  { x: Date.parse("2021-06-29 11:41:01"), y: 300, z: 400 },
  { x: Date.parse("2021-06-29 15:41:08"), y: 250, z: 280 },
];

const END_TICK = -1;
//https://github.com/recharts/recharts/issues/1137
//https://github.com/recharts/recharts/issues/956

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const ticks = [];
    for (let hour = 0; hour < 25; hour++) {
      if (hour === 24) {
        var tick = END_TICK;
      } else {
        var tick = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hour,
          0,
          0
        );
      }
      ticks.push(tick);
    }
    this.state = { todayInMS: today.getTime(), ticks: ticks };
  }

  formatXAxis(tickItem) {
    if (tickItem === END_TICK) {
      return "24:00:00";
    } else {
      let date = new Date(tickItem);
      let hours = date.getHours();
      let strHours = hours < 10 ? `0${hours}` : hours.toString();
      let minutes = date.getMinutes();
      let strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
      let seconds = date.getSeconds();
      let strSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
      return strHours + ":" + strMinutes + ":" + strSeconds;
    }
  }

  componentDidMount() {}

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
            dataKey="x"
            name="time"
            domain = {['auto', 'auto']}
            tickFormatter={unixTime => moment(unixTime).format("HH:mm")}
            scale="time"
          />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
