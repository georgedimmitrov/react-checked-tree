import { useState } from "react";
import Tab from "./Tab";

const tabs = ["TAB 1", "TAB 2", "TAB 3"];
const panels = ["Panel 1", "Panel 2", "Panel 3"];

const TabsContainer = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setTabIndex(tabIndex);
  };

  console.log(tabIndex);
  return (
    <div className="tabs-container-component">
      <div className="tabs-container-container">
        {tabs.map((tab, i) => {
          return (
            <Tab
              tab={tab}
              key={i}
              onClick={() => handleTabChange(i)}
              active={tabIndex === i}
            />
          );
        })}
      </div>

      <div>
        {panels.map((panel, i) => {
          return <div hidden={tabIndex === i ? false : true}>{panel}</div>;
        })}
      </div>
    </div>
  );
};

export default TabsContainer;
