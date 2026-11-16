
import { Container } from "react-bootstrap";

const divisions = [
  {
    id: 1,
    name: "13-15 Year Old Player Division",
    ageRange: "Ages 13–15",
    description:
      "This is the highest competition division at Tracy Babe Ruth and is played on the largest field. Players are expected to have mastered the fundamentals of batting, base running, fielding, and throwing. Game scores and standings are recorded, and an All-Star team is selected for the District 1 tournament.",
    image: "/images/divisions/division-placeholder.jpg",
  },
  {
    id: 2,
    name: "11-12 Year Old Player Division",
    ageRange: "Ages 11–12",
    description:
      "This is an intermediate competition division where players develop advanced offensive and defensive baseball skills. Game scores and standings are recorded, and top teams receive placement trophies. An All-Star team is selected to participate in the District 1 tournament.",
    image: "/images/divisions/division-placeholder.jpg",
  },
  {
    id: 3,
    name: "9-10 Year Old Player Division",
    ageRange: "Ages 9–10",
    description:
      "Players continue developing basic offensive and defensive baseball skills. This is a player-pitched division with pitch count and rest period safeguards. Game scores and standings are recorded, and an All-Star team is selected for the District 1 tournament.",
    image: "/images/divisions/division-placeholder.jpg",
  },
  {
    id: 4,
    name: "7-8 Year Old Player Division",
    ageRange: "Ages 7–8",
    description:
      "This is the first competitive division where players learn throwing, catching, batting, fielding, and base running. Players pitch with pitch count safeguards, and everyone bats in a continuous order. Each player is guaranteed at least two innings of defensive play per game.",
    image: "/images/divisions/division-placeholder.jpg",
  },
  {
    id: 5,
    name: "5-6 Year Old Player Division",
    ageRange: "Ages 5–6",
    description:
      "This instructional division introduces young players to baseball without keeping scores. Coaches pitch to players, who use a tee if they do not hit after six pitches. Every player bats each inning and participates on defense.",
    image: "/images/divisions/division-placeholder.jpg",
  },
  {
    id: 6,
    name: "4 Year Old Player Division",
    ageRange: "Age 4",
    description:
      "This instructional division introduces children to baseball and team sports. Players use foam bats and hit from a tee, with no outs or scores recorded. Every player bats each inning, participates on defense, and receives a participation trophy.",
    image: "/images/divisions/division-placeholder.jpg",
  },
];

function LeagueInformationPage() {
  return (
    <Container>
      <section id="about" className="py-4">
        <h1>League Information</h1>
        <p className="lead">
          Tracy Babe Ruth provides baseball and softball for players ages
          4–16, with opportunities to advance to district, regional, state
          and World Series play.
        </p>
      </section>

      <section id="divisions" className="py-4">
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

      <section id="documents" className="py-4"></section>
    </Container>
  );
}

export default LeagueInformationPage;
