import React, { useState } from 'react';
import classNames from 'classnames/bind';

import classes from './styles.module.scss';

const cx = classNames.bind(classes);

const Tooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  const className = cx({
    content: true,
    visible: isVisible,
  });

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.questionIcon}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
      >
        ?
      </div>
      <div className={className}>
        По нажатии на правую кнопку мыши откроется TodoList
      </div>
    </div>
  );
};

export default Tooltip;
