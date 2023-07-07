import React from "react";
import Button from "react-bootstrap/Button";
import "./style.css";
import {
  ICCheckCircle,
  ICClose,
  ICDelete,
  ICEdit,
  ICLeft,
  ICPlusCircle,
  ICPlus,
  ICRight,
  ICSetting,
  ICWarning,
} from "../../assets";

const Index = ({ className, type, name, id = "", icon, disabled = false }) => {
  function IconIdentifier(icon) {
    switch (icon.value) {
      case "checkCircle":
        return <ICCheckCircle className="iconSizeStyle "  />;
      case "close":
        return <ICClose className="iconSizeStyle "  />;
      case "delete":
        return <ICDelete className="iconSizeStyle "  />;
      case "edit":
        return <ICEdit className="iconSizeStyle "  />;
      case "left":
        return <ICLeft className="iconSizeStyle "  />;
      case "plusCircle":
        return <ICPlusCircle className="iconSizeStyle "  />;
      case "plus":
        return <ICPlus className="iconSizeStyle "  />;
      case "right":
        return <ICRight className="iconSizeStyle "  />;
      case "setting":
        return <ICSetting className="iconSizeStyle "  />;
      case "warning":
        return <ICWarning className="iconSizeStyle "  />;
      default:
        return "";
    }
  }
  return (
      <span disabled={disabled} className="centerObject" id={id} type={type}>
        
          <IconIdentifier value={icon} />

          {name}
      </span>
  );
};

export default Index;
