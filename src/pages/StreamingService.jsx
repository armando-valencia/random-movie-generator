import Generator from '../layouts/Generator';

export default function StreamingService({ name }) {
    return <Generator page={name} service={name.toLowerCase()} />;
}
