import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function CloseDetailsBtn({ nextProjectId }) {
  const navigate = useNavigate(); 

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <Button 
        variant="outline-light" 
        onClick={() => navigate('/')} 
        className="rounded-pill px-4"
      >
        ← Exit
      </Button>

      {nextProjectId && (
        <Button 
          variant="light" 
          onClick={() => navigate(`/project/${nextProjectId}`)} 
          className="rounded-pill px-4"
        >
          Next Project →
        </Button>
      )}
    </div>
  );
}

export default CloseDetailsBtn;