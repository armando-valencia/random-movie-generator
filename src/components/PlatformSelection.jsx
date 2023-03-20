import { Link } from "react-router-dom";

const platforms = ["Netflix", "Hulu", "HBO"];

const PlatformSelection = () => {
	return (
		<>
			<div className="flex flex-col items-center p-2">
				{platforms.map((platform) => (
					<Link
						key={platform}
						platform={platform}
						className="w-1/3 m-2 p-3 border border-[#31f610] rounded-full"
						to={`/${platform.toLowerCase()}`}
					>
						{platform}
					</Link>
				))}
			</div>
		</>
	);
};
export default PlatformSelection;
