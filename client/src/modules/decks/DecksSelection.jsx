import React from 'react';
import _ from 'lodash';
import { Spinner } from 'commons/spinner/spinner.component';
import { PlayersService } from 'commons/players/players.service';
import { ScheduleService } from 'commons/schedule/schedule.service';

export class DecksSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.params = props.match.params;
  }

  componentDidMount() {
    return ScheduleService.getSchedule(this.params.date)
      .then((schedule = []) => {
        const currentGame = _.find(schedule, { id: parseInt(this.params.gameId, 10) });
        const promises = _.map([currentGame.homeTeam, currentGame.awayTeam], ({ key }) => PlayersService.get(key));
        return Promise.all(promises)
          .then(([homePlayers, awayPlayers]) => this.setState({
            homePlayers,
            awayPlayers,
            currentGame,
            isLoading: false,
          }));
      });
  }

  render() {
    return this.state.isLoading ?
      <Spinner /> : (
      <div className="decks__selection">
        <div className="decks__game-card">
          <div className="decks__game-arena">
            <span>{this.state.currentGame.date}</span>
          </div>
          <div className="decks__game-card-wrapper">
            <div className="decks__game-card-col">
              <span>{this.state.currentGame.homeTeam.fullName}</span>
              <div className="decks__game-card-logo">
                <img src={this.state.currentGame.homeTeam.logo}></img>
              </div>
            </div>
            <div className="decks__game-card-middle">
              VS
            </div>
            <div className="decks__game-card-col">
              <div className="decks__game-card-logo">
                <img src={this.state.currentGame.awayTeam.logo}></img>
              </div>
              <span>{this.state.currentGame.awayTeam.fullName}</span>
            </div>
          </div>
        </div>
        <div className="decks__players">
          <div className="decks__players-col">
            {this.state.homePlayers
              .map(({ name, pictureUrl }) => (
                <div className="decks__player-card">
                  <div className="decks__player-card__name">
                    {name}
                  </div>
                  <div className="decks__player-card__picture">
                    <img src={pictureUrl}></img>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="decks__players-col">
            {this.state.awayPlayers
              .map(({ name, pictureUrl }) => (
                <div className="decks__player-card">
                  <div className="decks__player-card__name">
                    {name}
                  </div>
                  <div className="decks__player-card__picture">
                    <img src={pictureUrl}></img>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}