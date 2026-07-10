function PlanetCard({ title, description, image, bgColor }) {
  return (
    <div className={`${bgColor} rounded-3xl p-5 relative overflow-hidden`}>
      <img
        src={image}
        alt={title}
        className="absolute top-5 left-5 w-16 h-16 rounded-full object-cover"
      />

      <div className="ml-24">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-gray-700 mt-2 text-sm">
          {description}
        </p>

        <button className="mt-4 font-bold text-orange-600">
          View &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default PlanetCard;