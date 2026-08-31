import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ProjectCard = ({id, title, image}) => {
    return (
        //Makes the Card clickable : if its the hotel-dashboard, the link will redirect to the pages project
       <Link to={`/project/${id}`}>
            <Card>
                <Card.Img className="card-image" variant="top" src= {image} />
                <Card.Body>
                <Card.Text>
                   {title}
                </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProjectCard;