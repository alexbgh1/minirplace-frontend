import { getEmojiFlag } from "../../utils/countries-utils";

import { User } from "../../types";

interface CardBodyProps {
  user: User;
  dateDifference: string;
  count: number;
}

const CardBody = ({ user, dateDifference, count }: CardBodyProps) => {
  if (!user || !user.username || !dateDifference) return <UserNotFound dateDifference={dateDifference} />;

  const { username, country_code } = user;
  return (
    <>
      <h2 className="text-lg font-bold">
        {getEmojiFlag(country_code)} {username}
      </h2>
      <p className="text-xs text-gray-300">
        <small>Pixel updated: {dateDifference}</small>
      </p>
      <p className="text-xs text-gray-300">
        <small>{!isNaN(count) && count > 1 ? `${count} users updated this pixel` : "1 user updated this pixel"}</small>
      </p>
    </>
  );
};

const UserNotFound = ({ dateDifference }: { dateDifference: string }) => {
  return (
    <>
      <h2 className="text-lg font-bold">No user found 🤖</h2>
      <p className="text-xs text-gray-300">
        <small>Pixel updated: {dateDifference}</small>
      </p>
    </>
  );
};

export default CardBody;
