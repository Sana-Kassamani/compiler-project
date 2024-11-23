import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
import { languageOptions } from "../constants/languageOptions";
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="language-selector">
        <p className="language-text">Language:</p>
        <Menu>
            <MenuButton className="menu-button">
                {language}
            </MenuButton>
            <MenuList className="menu-list">
            {Object.entries(languageOptions).map(([lang, version]) => (
                <MenuItem
                    key={lang}
                    className={`menu-item ${lang === language ? 'active' : ''}`}
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
