import { useState } from "react"

export const useAnimationMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    const handleClickButton = () => {
        setShowMenu(!showMenu);
    }

    const handleLinkClick = () => {
        setShowMenu(false);
    }

    return { handleClickButton, handleLinkClick, showMenu };

}