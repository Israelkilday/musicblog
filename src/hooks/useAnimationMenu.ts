// HOOK
import { useState } from "react"

interface AnimationMenuState {
    showMenu: boolean;
}

interface AnimationMenuActions {
    handleClickButton: () => void;
    handleLinkClick: () => void;
}

export const useAnimationMenu = (): AnimationMenuState & AnimationMenuActions => {
    const [showMenu, setShowMenu] = useState(false)

    const handleClickButton = () => {
        setShowMenu(!showMenu);
    }

    const handleLinkClick = () => {
        setShowMenu(false);
    }

    return { handleClickButton, handleLinkClick, showMenu };
}