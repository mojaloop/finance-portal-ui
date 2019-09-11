
const setDate = (dt, {
  year, month, day, hour, minute, second, milli,
} = {}) => {
  const res = new Date(dt);
  res.setFullYear(year === undefined ? dt.getFullYear() : year);
  res.setMonth(month === undefined ? dt.getMonth() : month);
  res.setDate(day === undefined ? dt.getDate() : day);
  res.setHours(
    hour === undefined ? dt.getHours() : hour,
    minute === undefined ? dt.getMinutes() : minute,
    second === undefined ? dt.getSeconds() : second,
    milli === undefined ? dt.getMilliseconds() : milli,
  );
  return res;
};

const truncateDate = (dt, {
  year = false, month = false, day = false, hour = true, minute = true, second = true, milli = true,
} = {}) => setDate(new Date(dt), {
  year: year ? 1970 : undefined,
  month: month ? 1 : undefined,
  day: day ? 0 : undefined,
  hour: hour ? 0 : undefined,
  minute: minute ? 0 : undefined,
  second: second ? 0 : undefined,
  milli: milli ? 0 : undefined,
});

const sleep = (durationMs) => new Promise((resolve) => setTimeout(resolve, durationMs));

export {
  setDate,
  truncateDate,
  sleep,
};
