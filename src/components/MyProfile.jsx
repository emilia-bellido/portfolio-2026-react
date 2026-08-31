import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MyProfile() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          My roots are in Ecuador, but having lived on both the East and West
          coasts of the US and Canada, I've gotten to explore a mix of perspectives.
          I love using that experience to connect with people, collaborate, and
          share stories through the digital world.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MyProfile;