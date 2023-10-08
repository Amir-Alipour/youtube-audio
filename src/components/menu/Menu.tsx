import React, { useEffect } from "react";
import "./Menu.css";

type MenuProps = {
    children: React.ReactNode;
};

const Menu = ({ children }: MenuProps) => {
    useEffect(() => {
        const onClickOnWindow = function (event: Event) {
            const target = event.target as HTMLElement;

            if (!target.matches(".cus-drp-btn")) {
                let dropdowns = document.getElementsByClassName(
                    "custom-menu-dropdown-content"
                );
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains("custom-menu-show")) {
                        openDropdown.classList.remove("custom-menu-show");
                    }
                }
            }
        };

        window.addEventListener("click", onClickOnWindow);

        return () => {
            window.removeEventListener("scroll", onClickOnWindow);
        };
    }, []);

    return <div className="custom-menu">{children}</div>;
};

//  ===========================
type MenuContentProps = {
    children: React.ReactNode;
};
const MenuContent = ({ children }: MenuContentProps) => {
    return (
        <div id="custom-drp-cnt" className="custom-menu-dropdown-content">
            {children}
        </div>
    );
};

//  ===========================
type MenuItemProps = {
    children: React.ReactNode;
    onClick?: () => void;
};
const MenuItem = ({ children, onClick = () => {} }: MenuItemProps) => {
    return <div onClick={() => onClick()} className="cus-menu-item">{children}</div>;
};

//  ===========================
type MenuButtonProps = {
    children: React.ReactNode;
};
const MenuButton = ({ children }: MenuButtonProps) => {
    function showMenu() {
        document
            .getElementById("custom-drp-cnt")
            ?.classList.toggle("custom-menu-show");
    }

    return <div onClick={() => showMenu()}>{children}</div>;
};

export { Menu, MenuContent, MenuItem, MenuButton };
