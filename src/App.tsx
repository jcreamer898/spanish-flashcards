import React, { Component } from "react";
import "./App.css";
import styled from "@emotion/styled";

interface AppProps {
  cards: [string, string][];
}
interface AppState {
  currentCardIndex: number;
  currentCardShowMeaning: boolean;
}

const Word = styled.div`
  max-width: 50%;
`;

const Meaning = styled.div`
  max-width: 50%;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;

  @media (min-width: 420px) {
    width: 500px;
    height: 300px;
  }

  border-radius: 5px;
  color: rgba(0, 0, 0, 0.7);
  background: white;
`;

const Card: React.SFC<{
  word: string;
  meaning: string;
  showMeaning: boolean;
}> = ({ word, meaning, showMeaning }) => (
  <CardWrapper className="card">
    {!showMeaning && <Word className="card__word">{word}</Word>}
    {showMeaning && <Meaning className="card__meaning">{meaning}</Meaning>}
  </CardWrapper>
);

class App extends Component<AppProps, AppState> {
  state = {
    currentCardIndex: 0,
    currentCardShowMeaning: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          this.previousCard();
          break;
        case 39:
          this.nextCard();
          break;
        case 38:
        case 40:
          this.revealCard();
          break;
        default:
          break;
      }
    });
  }

  revealCard = () => {
    this.setState((currState) => ({
      currentCardShowMeaning: !currState.currentCardShowMeaning,
    }));
  };
  nextCard = () => {
    if (!this.hasNext()) {
      return;
    }

    this.setState((currState) => ({
      currentCardShowMeaning: false,
      currentCardIndex: currState.currentCardIndex + 1,
    }));
  };
  previousCard = () => {
    if (!this.hasPrevious()) {
      return;
    }

    this.setState((currState) => ({
      currentCardShowMeaning: false,
      currentCardIndex: currState.currentCardIndex - 1,
    }));
  };

  hasNext() {
    return this.state.currentCardIndex + 1 !== this.props.cards.length;
  }

  hasPrevious() {
    return this.state.currentCardIndex > 0;
  }

  render() {
    const cards = this.props.cards;
    const [word, meaning] = cards[this.state.currentCardIndex];

    return (
      <div className="App">
        <header className="App-header">
          <div className="card-list">
            <Card
              word={word}
              meaning={meaning}
              showMeaning={this.state.currentCardShowMeaning}
            />
            {this.hasPrevious() && (
              <button onClick={this.previousCard}>Previous</button>
            )}
            <button onClick={this.revealCard}>Show Meaning</button>
            {this.hasNext() && <button onClick={this.nextCard}>Next</button>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
