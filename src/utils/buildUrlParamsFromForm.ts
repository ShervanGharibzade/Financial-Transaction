import dayjs from "dayjs";

export interface TimestampRange {
  timestamp?: [dayjs.Dayjs, dayjs.Dayjs];
}

export type FormValueBase = Record<
  string,
  string | number | null | undefined | [any, any]
>;

export const buildUrlParamsFromForm = <
  T extends FormValueBase & Partial<TimestampRange>
>(
  values: Partial<T>
): URLSearchParams => {
  const urlParams = new URLSearchParams();

  for (const key in values) {
    const value = values[key];

    if (key === "timestamp" && Array.isArray(value) && value.length === 2) {
      const [start, end] = value;
      urlParams.set("timestamp_gte", start.format("YYYY-MM-DD"));
      urlParams.set("timestamp_lte", end.format("YYYY-MM-DD"));
    } else if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "null" &&
      value !== "all"
    ) {
      urlParams.set(key, String(value));
    }
  }

  return urlParams;
};
