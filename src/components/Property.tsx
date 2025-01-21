interface Props {
  name: string;
  value: string;
  icon?: React.ReactNode;
}
import { Fragment } from "react/jsx-runtime";

export const Property: React.FC<Props> = ({ name, value, icon }) => {
  return (
    <Fragment>
      <div className="flex gap-1">
        {icon && <div>{icon}</div>}
        <p>{name}</p>
      </div>
      <p className="opacity-50">{value}</p>
    </Fragment>
  );
}