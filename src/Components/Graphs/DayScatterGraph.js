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
  Legend,
} from "recharts";
import NoDataAvailable from "./NoDataAvailable";
import moment from "moment";
import PropTypes from 'prop-types';

//primarily based off https://github.com/recharts/recharts/issues/1028 (USE THIS)

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
  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log({payload})
      console.log({label});
      let activity = payload[0]["payload"]["activity"]
      let timestamp = moment(payload[0]["value"]).format("HH:mm");
      let yAxisInfo = payload[1]["value"]

      return (
        <div className="custom-tooltip">
          <p className="label">{`Activity: ${activity}`}</p>
          <p className="label">{`Time:${timestamp}`}</p>
          <p className="label">{`${this.props.yAxisName}: ${yAxisInfo}`}</p>
        </div>
      );
    }
    return null;
  };

  // look into tickformatter
  render() {
    if (this.props.inFlowData.length + this.props.notInFlowData === 0) {
      return <NoDataAvailable message="Sorry! No ratings for today were found in the database!" />;
    }

    console.log(this.props.notInFlowData);
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
            ticks={this.state.ticks}
          >
            <Label value="Hour" offset={-3} position="insideBottom"></Label>
          </XAxis>
          <YAxis
            type="number"
            dataKey={this.props.yAxisKey}
            name={this.props.yAxisName}
          >
            <Label value={this.props.yAxisName} angle={-90} position="left" />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<this.CustomTooltip />}
          />
          <Scatter name="In Flow" data={this.props.inFlowData} fill="#FF12FF" />
          <Scatter
            name="Not In Flow"
            data={this.props.notInFlowData}
            fill="#17FF1F"
          />
          <ReferenceLine y={0} stroke="#000" />
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

DayScatterGraph.propTypes = {
  yAxisKey : PropTypes.string,
  yAxisName : PropTypes.string,
  inFlowData : PropTypes.array,
  notInFlowData : PropTypes.array
}
