import React, { useState } from 'react';

import styles from './styles.module.scss';

const Tooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.questionIcon}
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
      >
        ?
      </div>
      <div className={`${styles.tooltipContent} ${isVisible ? styles.visible : ''}`}>
        По нажатии на правую кнопку мыши откроется TodoList
      </div>
    </div>
  );
};

export default Tooltip;
