import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import monacoThemes from "monaco-themes/themes/themelist";
import down from "../assets/chevron-down.svg";
import "../styles/Selectors.css";

const ThemeSelector = ({ handleThemeChange, theme }) => {
  return (
    <div className="selector">
      <Menu>
        <MenuButton className="menu-button">
          {theme?.label || "Select Theme"}
          <img src={down} alt="Drop Down Arrow"/>
        </MenuButton>
        <MenuList className="menu-list">
          {Object.entries(monacoThemes).map(([themeId, themeName]) => (
              <MenuItem
                key={themeId}
                className={`menu-item ${
                  theme?.value === themeId ? "active" : ""
                }`}
                onClick={() =>
                  handleThemeChange({ value: themeId, label: themeName })
                }
              >
                {themeName}
              </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ThemeSelector;
