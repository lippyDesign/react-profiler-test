import React, { unstable_Profiler as Profiler } from 'react';
import axios from 'axios';

import List from './List';

class App extends React.Component {
  state = {
    count: 0,
    data: null
  };

  componentDidMount() {
    this.fetchData();
  }

  logProfile = (id, phase, actualTime, baseTime, startTime, commitTime, interactions) => {
    console.log('--------- logProfile fired -----------')
    console.log(`${id}'s ${phase.toUpperCase()} phase:`);
    console.log(`Actual time: ${actualTime} ms`);
    console.log(`Base time: ${baseTime} ms`); // time taken by react
    console.log(`Start time (since component mounted): ${startTime} ms`); // time at which render starts
    console.log(`Commit time (since component mounted): ${commitTime} ms`);
    console.log(`Interactions: ${interactions}`);
  };

  go = direction => () => this.setState(({ count }) => ({
    count: direction === "up" ? count + 1 : count - 1
  }));

  fetchData = async () => {
    this.setState({ data: null });
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/');
      this.setState({ data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Profiler id="listPage" onRender={this.logProfile}>
        <button onClick={this.go("up")}>up</button>
        <div>The count is {this.state.count}</div>
        <button onClick={this.go("down")}>down</button>
        <hr />
        <button onClick={() => this.fetchData()}>refetch</button>
        <hr />
        <List data={this.state.data} />
      </Profiler>
    );
  }
}

export default App;
