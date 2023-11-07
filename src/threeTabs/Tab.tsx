interface TabProps {
  tab: string;
  onClick: () => void;
  active: boolean;
}

const Tab: React.FC<TabProps> = ({ tab, onClick, active }) => {
  return (
    <div className={`tab ${active ? "active" : ""}`} onClick={onClick}>
      <b>{tab}</b>
    </div>
  );
};

export default Tab;
