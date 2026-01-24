import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';

const BackButton = () => (
    <Link
        to="/"
        aria-label="Back to home"
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:-translate-y-0.5 hover:text-[color:var(--text)]"
    >
        <IoReturnUpBackSharp size={18} />
        Back
    </Link>
);

export default BackButton;
