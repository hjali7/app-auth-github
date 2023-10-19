import Link from "next/link";
import ProfileIcon from "./ProfileIcon";

export default function Navbar () {
    return (
        <nav className="flex justify-between py-4 shadow-xl border-b-4 px-6 text-white bg-teal-600 left-0 right-0 fixed">
            <Link href='/' className="font-bold text-xl hover:text-teal-950">NEXT_AUTH</Link>
            <ProfileIcon />
        </nav>
    )
}