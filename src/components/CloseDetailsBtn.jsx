import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from "react-router-dom";
function CloseDetailsBtn() {
  const navigate = useNavigate(); 

  return (
    <CloseButton 
      onClick={() => navigate('/')} 
      aria-label="Close project details" className="close-btn"
    />
  );
}

export default CloseDetailsBtn;