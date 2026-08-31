import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from "react-router-dom"; // 1. Use navigate instead of Link

function CloseDetailsBtn() {
  const navigate = useNavigate(); // 2. Initialize the hook

  return (
    <CloseButton 
      onClick={() => navigate('/')} // 3. Trigger the route change on click
      aria-label="Close project details"
    />
  );
}

export default CloseDetailsBtn;