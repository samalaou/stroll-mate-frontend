import { Container } from '@mui/material';
import PageHeader from '../components/PageHeader';
import WalksOverview from '../components/WalksOverview';

function Homepage() {
    return (
        <Container component="main">
            <PageHeader
                title="Home"
            />
            <WalksOverview/>
        </Container>
    );
}

export default Homepage;
