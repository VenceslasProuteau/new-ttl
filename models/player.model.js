module.exports = class Player {
  constructor({
    PlayerID,
    Status,
    Team,
    Position,
    FirstName,
    LastName,
    PhotoUrl,
  }) {
    this.id = PlayerID;
    this.status = Status;
    this.team = Team;
    this.positoon = Position;
    this.name = `${FirstName} ${LastName}`;
    this.pictureUrl = PhotoUrl;
  }
}