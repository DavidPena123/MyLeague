
import { Container } from "react-bootstrap";

function LeagueInformationPage() {
  return (
    <Container>
      <section id="about">
        <h1>League Information</h1>
        <p className="lead">
          Tracy Babe Ruth provides baseball and softball for players ages
          4–16, with opportunities to advance to district, regional, state
          and World Series play.
        </p>
      </section>

      <section id="divisions"></section>
      <section id="documents"></section>
    </Container>
  );
}

export default LeagueInformationPage;
