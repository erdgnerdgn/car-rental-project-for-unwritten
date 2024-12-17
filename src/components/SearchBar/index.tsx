import React, { useMemo, useState } from "react";
import { makes } from "../../constants";
import { IOption } from "../../types";
import SearchButton from "./SearchButton";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [params, setParams] = useSearchParams();

  // Add the make and model to the url
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (make !== "" && model === "") {
      setParams({ make: make.toLowerCase() });
    } else if (make !== "" && model !== "") {
      setParams({
        make: make.toLowerCase(),
        model: model.toLowerCase(),
      });
    } else {
      alert("Please select brand and model");
    }
  };

  const options: IOption[] = useMemo(
    () =>
      makes.map((item) => ({
        label: item,
        value: item,
      })),
    [makes]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar gap-3"
      data-testid="search-form"
    >
      {/* choose make */}
      <div className="searchbar__item text-black">
        <Select
          className="w-full"
          options={options}
          onChange={(e: IOption | null) => e && setMake(e.value)}
        />
        <SearchButton styling="sm:hidden" />
      </div>
      {/* choose model */}
      <div className="searchbar__item">
        <img width={25} src="/model-icon.png" className="absolute ml-4" />
        <input
          type="text"
          placeholder="Civic"
          className="searchbar__input text-black rounded"
          onChange={(e) => setModel(e.target.value)}
        />
        <SearchButton styling="sm:hidden" />
      </div>

      <SearchButton styling="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
