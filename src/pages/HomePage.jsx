import { Container } from '@mui/material';
import PageHeader from '../components/PageHeader';
import HomeMap from '../components/HomeMap';

function Homepage() {
    return (
        <Container component="main">
            <PageHeader
                title="Generate Walk Itinerary"
            />
            <HomeMap/>
        </Container>
    );
}

export default Homepage;
