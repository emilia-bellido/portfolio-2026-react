import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ProjectCard = ({id, title, image}) => {
    return (
       <Link to={`/project/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="project-card-link custom-project-card d-block h-100">
            {/* Added p-2 here to create an even "frame" of padding around the inside of the card */}
            <Card className="glass-card p-2 border-0">
                
                {/* The new frame wrapper that forces all images to be the exact same size */}
                <div className="image-frame rounded-3 overflow-hidden">
                    <Card.Img className="card-image" variant="top" src={image} loading="lazy" />
                </div>
                
                <Card.Body className="d-flex align-items-center justify-content-between p-3 pb-1">
                    {/* Added text-truncate so if a title is extremely long, it doesn't break the uniform card height */}
                    <Card.Title className="m-0 fs-5 fw-bold text-white text-truncate pe-3">
                        {title}
                    </Card.Title>
                    <span className="text-muted-custom fs-4">→</span>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProjectCard;