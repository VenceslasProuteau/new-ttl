module.exports = class Game {
  constructor({
    game: {
      GameID,
      DateTime
    },
    homeTeam,
    awayTeam,
  }) {
    this.id = GameID;
    this.date = DateTime;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }
}