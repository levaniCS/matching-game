import React from 'react';

const Card = (props) => {
  const clicked = (framework) => {
    props.click(framework);
  };

  const cardStyles =
    'card' +
    (!props.close ? ' opened' : '') +
    (props.complete ? ' matched' : '');

  return (
    <div className={cardStyles} onClick={() => clicked(props.framework)}>
      <div className='front'>?</div>
      <div className='back'>
        <img
          alt={props.framework}
          src={
            'https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/' +
            props.framework +
            '.png'
          }
        />
      </div>
    </div>
  );
};

export default Card;
