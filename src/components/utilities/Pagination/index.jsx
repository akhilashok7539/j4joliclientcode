
import './style.css';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const Pagination = ({ currentPage, pagination, url }) => {
  const { first, prev, next, last } = pagination;

  const history = useHistory();

  const onPrevButtonClick = () => {
    if (prev !== null) {
      history.push(`${url}/${prev}`);
    }
  };

  const onFirstButtonClick = () => {
    if (first !== null) {
      history.push(`${url}/${first}`);
    }
  };

  const onNextButtonClick = () => {
    if (next !== null) {
      history.push(`${url}/${next}`);
    }
  };

  const onLastButtonClick = () => {
    if (last !== null) {
      history.push(`${url}/${last}`);
    }
  };

  if (first || next || prev || last) {
    return (
      <div className="pagination">
        <button onClick={onFirstButtonClick} className="button">
          <FaAngleDoubleLeft className="icon" />
        </button>

        <button onClick={onPrevButtonClick} className="button">
          <FaAngleLeft className="icon" />
        </button>

        <div className="button current-page">{isNaN(currentPage) ? '1' : currentPage}</div>

        <button onClick={onNextButtonClick} className="button">
          <FaAngleRight className="icon" />
        </button>

        <button onClick={onLastButtonClick} className="button">
          <FaAngleDoubleRight className="icon" />
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Pagination;
