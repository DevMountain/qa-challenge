import { rest } from "msw";

export const handlers = [
  rest.get("/api/weather", (req, res, ctx) => {
    return res(
      ctx.json({
        zipcode: 84602,
        location: "Provo, UT",
        description: "partly cloudy",
        currentTemperature: "76℉",
        maxTemperature: "79℉",
        minTemperature: "54℉",
        humidity: "22%",
        wind: "10 MPH",
      })
    );
  }),
  rest.get("/reset", (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
