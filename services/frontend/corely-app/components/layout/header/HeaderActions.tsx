import { WishlistButton } from "./WishlistButton";
import { NotificationButton } from "./NotificationButton";
import { MiniCart } from "./MiniCart";
import { UserDropdown } from "./UserDropdown";

export function HeaderActions() {
    return (
        <nav className="flex items-center gap-1 sm:gap-2">
            <WishlistButton />
            <NotificationButton />
            <MiniCart />
            <UserDropdown />
        </nav>
    );
}
