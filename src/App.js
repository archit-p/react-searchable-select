import Select from "react-select";
import React, {useState, useMemo} from "react";
import hljs from "highlight.js";
import "./style.css";

export default function App() {
  const [state, setState] = useState({language: ""});

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: 180,
      fontSize: "0.75rem",
      boxShadow: "none",
      cursor: "pointer",
      borderColor: "hsl(0, 0%, 80%)",
      "&:hover": {
        borderColor: "hsl(0, 0%, 60%)"
      }
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: 5,
      backgroundColor: state.isSelected ? "rgba(0, 0, 0, 0.1)" : "transparent",
      color: state.isSelected || state.isFocused ? "rgba(0, 0, 0, 1)" : "hsl(0, 0%, 60%)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "transparent"
      },
      "&:hover": {
        color: "rgba(0, 0, 0, 1)"
      }
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.75rem",
      width: 200,
      overflowY: "auto"
    }),
    menuList: (base) => ({
      ...base,
      padding: 14
    }),
    indicatorSeparator: (base) => ({
      width: 0
    }),
    dropdownIndicator: (base) => ({
      ...base,
      svg: {
        ...base.svg,
        height: 15,
        fill: "rgba(0, 0, 0, 0.8)",
        transform: "rotate(180deg)"
      }
    })
  };

  let supportedLanguages = hljs
    .listLanguages()
    .filter((language) => language.length <= 12)
    .map((language) => ({
      label: hljs.getLanguage(language).name,
      value: language
    })).filter((language) => language.label.length <= 12);

  const languageOptions = [{value: "", label: "Auto"}, ...supportedLanguages];

  return (
    <div className='App'>
      <div className='display'>
        <Select
          styles={customStyles}
          options={languageOptions}
          menuPlacement='top'
          onChange={(entry) => {
            setState((state) => ({...state, language: entry.value}));
          }}
          defaultValue={{label: "Auto", value: ""}}
          blurInputOnSelect={true}
          menuShouldScrollIntoView={true}
        />
      </div>
    </div>
  );
}
