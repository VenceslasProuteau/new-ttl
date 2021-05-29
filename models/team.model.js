const format = require('date-fns/format')

module.exports = class Team {
  constructor({
    TeamID,
    GlobalTeamID,
    Key,
    City,
    Name,
    WikipediaLogoUrl,
  }) {
    this.id = TeamID;
    this.key = Key;
    this.globalTeamId = GlobalTeamID;
    this.logo = WikipediaLogoUrl;
    this.city = City;
    this.name = Name;
    this.fullName = `${this.city} ${this.name}`;
  }
}