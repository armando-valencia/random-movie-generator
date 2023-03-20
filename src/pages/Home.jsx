import PlatformSelection from "../components/PlatformSelection";

const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-2xl">Welcome!</h1>
			<h2 className="text-xl">
				What platform are you looking to get started with?
			</h2>
			<PlatformSelection />
		</div>
	);
};
export default Home;
