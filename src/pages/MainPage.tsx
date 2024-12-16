import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { fetchCars } from "../utils";
import { ICarProps } from "../types";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import CustomFilters from "./../components/CustomFilters";
import { useSearchParams } from "react-router-dom";
import ShowMore from "../components/ShowMore";
import { fuels, years } from "../constants";

interface Error {
  error?: string;
}

const MainPage = () => {
  const [cars, setCars] = useState<ICarProps[]>([]);
  const [params, setParams] = useSearchParams();

  // If there is a limit parameter, take it, if not, set it to 5
  const limit = Number(params.get("limit")) || 5;

  useEffect(() => {
    // Passing search parameters to an object in a url
    const paramsObj = Object.fromEntries(params.entries());

    fetchCars(paramsObj) //
      .then((res: ICarProps[]) => setCars(res));
  }, [params]);

  // Checking if data is full
  const isDataEmpty: boolean = !Array.isArray(cars) || cars.length < 1 || !cars;

  return (
    <div>
      <Hero />

      <div id="catalogue" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Discover cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilters title="Yakıt Tipi" options={fuels} />
            <CustomFilters title="Üretim Yılı" options={years} />
          </div>
        </div>

        {isDataEmpty ? (
          //If the cars do not arrive, a warning is printed on the screen.
          <div className="home__error-container">
            <h2>Sorry No Results Found</h2>
          </div>
        ) : (
          // If the cars arrive, cards are printed on the screen
          <>
            <section>
              <div className="home__cars-wrapper">
                {cars.map((car, i) => (
                  <Card car={car} key={i} />
                ))}
              </div>

              <ShowMore limit={limit} isNext={limit < 30} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
