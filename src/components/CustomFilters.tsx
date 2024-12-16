import { useEffect, useState } from "react";
import { IOption } from "../types";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

interface IFilterProps {
  title: string;
  options: IOption[];
}

const CustomFilters = ({ title, options }: IFilterProps) => {
  const [selected, setSelected] = useState<IOption | null>();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    // url specifies the parameter name to be added
    const key = title === "Fuel Type" ? "fuel" : "year";

    // değer seçildiyse paramtreye ekler yoksa kaldırır
    if (selected?.value) {
      // add url
      params.set(key, selected.value.toLowerCase());
    } else {
      // remove from url
      params.delete(key);
    }

    // update url
    setParams(params);
  }, [selected]);

  return (
    <div className="w-fit">
      <Select
        onChange={(e: IOption | null) => setSelected(e)}
        options={options}
        className="text-black min-w-[100px]"
        placeholder={title}
      />
    </div>
  );
};

export default CustomFilters;
