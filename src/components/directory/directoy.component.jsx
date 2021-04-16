import React from "react";
import MenuItem from "../menu-items/menu-items.components";
import "../directory/directory.styles.scss";
import { connect } from "react-redux";
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import {createStructuredSelector} from 'reselect';

const Directory = ({sections}) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectiionProps }) => (
      <MenuItem key={id} {...otherSectiionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
