import { fetchCars, generateImage } from "../utils/index";
import { colors } from "../constants";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { make: "Toyota", model: "Corolla", year: 2020, fuel_type: "Gas" },
      ]),
  })
);

describe("fetchCars", () => {
  it("should fetch car data from the API", async () => {
    const filters = {
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      fuel: "Gas",
      limit: "5",
    };
    const data = await fetchCars(filters);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=Toyota&model=Corolla&year=2020&fuel_type=Gas&limit=5",
      {
        headers: {
          "X-RapidAPI-Key":
            "75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247",
          "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
        },
      }
    );
    expect(data).toEqual([
      { make: "Toyota", model: "Corolla", year: 2020, fuel_type: "Gas" },
    ]);
  });
});
describe("generateImage", () => {
  it("should generate a valid image URL", () => {
    const car = { make: "Toyota", model: "Corolla" };
    const angle = "45";

    // Mock Math.random to return a fixed value
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const url = generateImage(car, angle);

    const expectedUrl = new URL("https://cdn.imagin.studio/getimage");
    expectedUrl.searchParams.append("customer", "hrjavascript-mastery");
    expectedUrl.searchParams.append("make", "Toyota");
    expectedUrl.searchParams.append("modelFamily", "Corolla");
    expectedUrl.searchParams.append("zoomType", "fullscreen");
    expectedUrl.searchParams.append("angle", "45");
    const i = Math.round(0.5 * colors.length);
    expectedUrl.searchParams.append("paintId", colors[i]);

    expect(url).toBe(String(expectedUrl));

    // Restore Math.random
    Math.random.mockRestore();
  });
});
