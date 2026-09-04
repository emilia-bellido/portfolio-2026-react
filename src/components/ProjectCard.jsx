import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ProjectCard = ({id, title, image}) => {
    return (
        //Makes the Card clickable : if its the hotel-dashboard, the link will redirect to the pages project
       <Link to={`/project/${id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <Card className="glass-card">
                <Card.Img className="card-image" variant="top" src= {image} />
                <Card.Body>
                <Card.Text className="card-title fw-vold">
                   {title}
                </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProjectCard;