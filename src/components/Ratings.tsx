import starRegular from "../assets/star-regular.svg";
import starSolid from "../assets/star-solid.svg";
type Star = {
  id: number;
};
const stars: Star[] = [];
for (let i = 0; i < 5; i++) {
  stars.push({
    id: i,
  });
}
const Ratings = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {stars.map((star, index) => (
        <img
          src={index < rating ? starSolid : starRegular}
          alt="star"
          key={String(star.id)}
          width={22}
          height={22}
        />
      ))}
    </div>
  );
};
export default Ratings;
