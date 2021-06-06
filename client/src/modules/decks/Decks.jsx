import React from 'react';
import format from 'date-fns/format'
import { reverse } from 'named-urls';

import { Spinner } from 'commons/spinner/spinner.component';
import { ScheduleService } from 'commons/schedule/schedule.service';
import { DECK_STATES } from './route-paths';

export class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentDate: format(Date.now(), 'yyyy-MM-dd'),
    };
  }

  componentDidMount() {
    return ScheduleService.getSchedule(this.state.currentDate)
      .then((games) => {
        this.setState({
          isLoading: false,
          games,
        });
      }).catch((e) => console.log('e', e));
  }

  selectGame(gameId) {
    return this.props.history.push(reverse(DECK_STATES.SELECTION, {
      gameId,
      date: this.state.currentDate,
    }));
  }

  render() {
    return (
      this.state.isLoading ?
        <Spinner /> :
        <div className="decks__games-card">
          {this.state.games.map(({
            awayTeam,
            homeTeam,
            id,
            date,
          }) =>
            <div className="decks__game-card" key={id} onClick={() => this.selectGame(id)}>
              <div className="decks__game-arena">
                <span>{date}</span>
              </div>
              <div className="decks__game-card-wrapper">
                <div className="decks__game-card-col">
                  <span className="decks__game-card-team">{homeTeam.fullName}</span>
                  <div className="decks__game-card-logo">
                    <img src={homeTeam.logo}></img>
                  </div>
                </div>
                <div className="decks__game-card-middle">
                  VS
                </div>
                <div className="decks__game-card-col">
                  <div className="decks__game-card-logo">
                    <img src={awayTeam.logo}></img>
                  </div>
                  <span className="decks__game-card-team">{awayTeam.fullName}</span>
                </div>
              </div>
            </div>
          )}
        </div>
    )
  }
}
