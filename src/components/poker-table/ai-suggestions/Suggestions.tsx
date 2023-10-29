import React from 'react';

import styles from './Suggestions.module.less';

const Suggestions = () => {
  return (
    <div className={styles.suggestionsContainer}>
      <div>
        <h3>Your Hand</h3>
        <p>answer from ai</p>
      </div>
      <div>
        <h3>Possible Hand Now</h3>
        <p>answer from ai</p>
      </div>
      <div>
        <h3>Suggestion</h3>
        <p>answer from ai</p>
      </div>
    </div>
  );
};

export default Suggestions;
