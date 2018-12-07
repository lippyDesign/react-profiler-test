import React from 'react';

class List extends React.Component {
  render() {
    if (!this.props.data) return null;
    return <ul>
      {this.props.data.map(({ completed, id, title, userId }) => <li key={id}>
        completed: {completed}, id: {id}, title: {title}, userId: {userId}
      </li>)}
    </ul>;
  }
}

export default List;