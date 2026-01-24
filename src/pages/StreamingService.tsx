import Generator from '../layouts/Generator';
import type { StreamingService } from '../types/movie';

type StreamingServiceProps = {
    service: StreamingService;
    label: string;
};

export default function StreamingService({
    service,
    label,
}: StreamingServiceProps) {
    return <Generator page={label} service={service} />;
}
