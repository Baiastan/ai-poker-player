import React from 'react';

import styles from './Suggestions.module.less';

const Suggestions = ({ suggestions }) => {
  return (
    <div className={styles.suggestionsContainer}>
      <div>
        <div>
          <h3>Suggestions</h3>
          <p>{suggestions}</p>
        </div>

        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default Suggestions;
