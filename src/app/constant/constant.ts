import moment from "moment";

var CURRENT_DATE = moment();
export const DAYS = [
  {
    day: "Today",
    unix: Math.floor(CURRENT_DATE.unix() / 1000),
  },
  {
    day: "Tomorrow",
    unix: Math.floor(CURRENT_DATE.add(1, "days").startOf("day").unix() / 1000),
  },
];
