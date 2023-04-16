import PlatformGenerator from '../layouts/PlatformGenerator';

export default function StreamingService({ name }) {
    return <PlatformGenerator page={name} service={name.toLowerCase()} />;
}
