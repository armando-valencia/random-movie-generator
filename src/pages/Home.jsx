import PlatformSelection from '../components/PlatformSelection';

const Home = () => (
    <div className="text-center">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        <h2 className="text-xl px-3 py-2 text-gray-200">
            What platform are you looking to get started with?
        </h2>
        <PlatformSelection />
    </div>
);
export default Home;
