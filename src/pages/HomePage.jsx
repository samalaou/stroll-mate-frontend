import { Container } from '@mui/material';
import PageHeader from '../components/PageHeader';
import Map from '../components/Map';

function Homepage() {
    return (
        <Container component="main">
            <PageHeader
                title="Generate Walk Itinerary"
            />
            <Map/>
        </Container>
    );
}

export default Homepage;
