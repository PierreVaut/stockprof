import React from 'react';
import Moment from 'react-moment';
import { colors } from '../../config/color';

export class TimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      newComment: '',
    };
  }

  render() {
    const {
      timestamp, content, author, upvote, downvote, comments, handleSubmit, _id, currentUser,
    } = this.props;
    const { showComments, newComment } = this.state;
    const initial = author.substr(0, 1);
    const commTest = [
      { author: 'Roger', authorId: '683513513515', content: 'triallalalmokjlp' },
      { author: 'Roger', authorId: '683513513515', content: 'triallalalmokjlp' },
      { author: 'Roger', authorId: '683513513515', content: 'triallalalmokjlp' },
      { author: 'Roger', authorId: '683513513515', content: 'triallalalmokjlp' },
    ];
    return (
      <div className="list-item">
        <div
          className="user-avatar"
          style={{ backgroundColor: colors[(initial.charCodeAt(0)) % colors.length] }}
        >
          {initial.toUpperCase()}
        </div>

        <div className="user-name">
          {author}{' - '}{content}

          <div className="timeline-timestamp"><Moment fromNow>{ timestamp }</Moment></div>
          <div className="timeline-votes">
            <span
              role="img"
              aria-label="thumb-up"
              style={{ cursor: 'pointer' }}
              onClick={() => {
            handleSubmit({
 upvote: upvote + 1, _id, producerId: currentUser._id, producerName: currentUser.name,
});
        }}
            > 👍
            </span>{ upvote } { }
            <span
              role="img"
              aria-label="thumb-down"
              style={{ cursor: 'pointer' }}
              onClick={() => {
            handleSubmit({
 downvote: downvote + 1, _id, producerId: currentUser._id, producerName: currentUser.name,
});
        }}
            > 👎
            </span>{ downvote } { }
            <span
              role="img"
              aria-label="comments"
              style={{ cursor: 'pointer' }}
              onClick={() => this.setState({ showComments: !showComments })
        }
            >💬
            </span>{ commTest ? commTest.length : 0 }
            {showComments ?
              <div>
                <input
                  className="comment-input-text"
                  type="text"
                  value={newComment}
                  onChange={e => this.setState({ newComment: e.target.value })}
                  placeholder="Commenter..."
                />
                <button
                  className="comment-input-button"
                >send
                </button>
                <ul>
                  {commTest && commTest.map(comment =>
                    <li>{JSON.stringify(comment)}</li>)}
                </ul>
                <span
                  className="userSocialLink"
                  onClick={() => this.setState({ showComments: !showComments })}
                >Fermer
                </span>
              </div>
          : null }
          </div>
        </div>
      </div>
    );
  }
}

