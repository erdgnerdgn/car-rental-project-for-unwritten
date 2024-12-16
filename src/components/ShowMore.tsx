import { useSearchParams } from "react-router-dom";
import CustomButton from "./CustomButton";

type ShowMoreProps = {
  limit: number;
  isNext: boolean;
};

const ShowMore = ({ limit, isNext }: ShowMoreProps) => {
  const [params, setParams] = useSearchParams();

  const handleNavigate = () => {
    // new limit
    const newLimit: number = limit + 5;

    //  Adds a new parameter without deleting it
    params.set("limit", String(newLimit));

    // update url
    setParams(params);
  };

  return (
    <div className="w-full flex-center gap-5 my-10">
      {isNext && (
        <CustomButton
          title="More"
          designs="bg-primary-blue rounded-full "
          handleClick={handleNavigate}
        />
      )}
    </div>
  );
};

export default ShowMore;
