import React from 'react';
let {Component} = React;
import {Link} from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import "./CharacterThumbnail.css";

import * as Img from '../../public/Characters/img';

export default class CharacterThumbnail extends Component {

    render() {
      var img = (this.props.imageUrl != 'placeholder-male' && this.props.imageUrl != 'placeholder-female')
                ? this.props.imageUrl :
                (this.props.imageUrl == 'placeholder-male' ? Img['PlaceholderMale']: Img['PlaceholderFemale']);

      var detailLink = '/characters/'+encodeURIComponent(this.props.name);

      return (
          <Col lg={2} md={3} sm={4} xs={6}>
            <Link className="to-transition" to={detailLink}>
              <div className="character-thumbnail">
                <div className="character-thumbmail-img-container">
                  <img src={img} className="character-thumbnail" title={this.props.name} />
                </div>
                <div className="character-thumbnail-name"><p>{this.props.name}</p></div>
                <div className="characters-list-plod">
                  <img src={Img['RipTombstoneTransparent']} />
                  <div className="plod-percentage-cropper" style={{'height': this.props.plodCropperSize+'px'}}><img src={Img['RipTombstone']} /></div>
                  <div className="plod-percentage">{this.props.plod}</div>
                </div>
              </div>
            </Link>
          </Col>
        );
    }
}

CharacterThumbnail.propTypes = {
  imageUrl: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  plod: React.PropTypes.string,
  plodCropperSize: React.PropTypes.number
};
CharacterThumbnail.defaultProps = { imageUrl: Img['PlaceholderMale']};
