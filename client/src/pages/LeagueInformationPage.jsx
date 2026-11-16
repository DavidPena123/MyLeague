
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

      
<section id="divisions">
  <h2>Player Divisions</h2>
  <p>
    Tracy Babe Ruth offers several player divisions based on age
    and skill development. Players are generally assigned to
    divisions according to their age to ensure appropriate
    competition and opportunities to develop their skills.
    Each division encourages teamwork, sportsmanship, and
    continued player development.
  </p>

  {/* Division cards go here */}
</section>

      <section id="documents"></section>
    </Container>
  );
}

export default LeagueInformationPage;
