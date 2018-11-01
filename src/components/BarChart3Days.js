import React, { Component } from "react";
import { AppConsumer } from "../AppContext";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

import format from "date-fns/format";
import { ComposedChart, Bar, Cell } from "recharts";
import { determineColor } from "../utils/utils";

const styles = theme => ({
  root: {}
});

class BarChart3Days extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <AppConsumer>
        {context => {
          const { dataModel, irrigationDate } = context;
          const irriDate = format(new Date(irrigationDate), "MM/dd/YYYY");
          const irrigationDayIdx = dataModel.findIndex(
            obj => obj.date === irriDate
          );
          const data = dataModel.slice(irrigationDayIdx - 14).map(obj => {
            let p = { ...obj };
            p.deficit = obj.deficit === 0 ? 0.0000001 : obj.deficit;
            return p;
          });

          // console.log(data);
          return (
            <>
              <Typography
                variant="button"
                style={{
                  // marginLeft: 32,
                  color: "#9E9E9E",
                  fontWeight: "bold",
                  marginTop: 32
                }}
              >
                Since Last Irrigate:{" "}
                <span style={{ color: "#242038" }}>
                  {format(new Date(data[0].date), "MMM d, YYYY")}
                </span>
              </Typography>

              <ComposedChart
                width={window.innerWidth}
                height={150}
                data={data}
                margin={{ top: 0, right: -2, left: -2, bottom: 0 }}
              >
                <Bar dataKey="deficit">
                  {data.map((entry, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={determineColor(entry.deficit)}
                        stroke={determineColor(entry.deficit)}
                        // strokeWidth={index === 2 ? 4 : 1}
                      />
                    );
                  })}
                </Bar>
              </ComposedChart>
            </>
          );
        }}
      </AppConsumer>
    );
  }
}

export default withRoot(withStyles(styles)(BarChart3Days));
