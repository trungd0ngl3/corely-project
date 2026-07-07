import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function HeaderLogo() {
    return (
        <Link href="/">
            <Logo className="scale-90 origin-left" />
        </Link>
    );
}