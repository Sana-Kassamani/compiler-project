import React from "react";
import monacoThemes from "monaco-themes/themes/themelist";
import Select from "react-select";

const ThemeSelector = ({handleThemeChange, theme}) => {
    return(
        <Select 
            placeholder={`Select Theme`}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
            }))}
            value={theme}
            onChange={handleThemeChange}
        />
    )
};

export default ThemeSelector;