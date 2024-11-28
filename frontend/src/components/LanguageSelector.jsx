import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import { languageOptions } from "../constants/LanguageOptions";
import "../styles/Selectors.css";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="selector">
      <Menu>
        <MenuButton className="menu-button menu-button-language">
          {language}
        </MenuButton>
        <MenuList className="menu-list">
          {Object.entries(languageOptions).map(([lang, version]) => (
            <MenuItem
              key={lang}
              className={`menu-item ${lang === language ? "active" : ""}`}
              onClick={() => onSelect(lang)}
            >
              {lang}
              <span className="version">({version})</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
