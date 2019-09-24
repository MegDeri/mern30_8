import React from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import { withRouter } from "react-router-dom";

class PostSingle extends React.Component {

  componentDidMount() {
    const { loadPost, match } = this.props;
    loadPost(match.params.id);
  }

  render() {
    const {posts, request} = this.props;

    const textin =  request.pending ? ( 
        <Spinner /> 
      ) : request.success ? ( 
         posts.length > 0 ? (
            <article>
                <SmallTitle>{post.title}</SmallTitle>
                <HtmlBox>{post.content}</HtmlBox>
            </article> 
      ) : ( 
        <Alert variant="info"> No posts!!! </Alert>
      )) : ( 
        <Alert variant="error"> {request.error} </Alert>
      );

    return (
      <div> {textin} </div>
    );
  }

};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      match: PropTypes.object.isRequired,
    })
  ),
  loadPost: PropTypes.func.isRequired,
};

export default withRouter(props => <PostSingle {...props} />);